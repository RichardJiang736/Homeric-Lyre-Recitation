import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import Replicate from 'replicate'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN
if (!REPLICATE_API_TOKEN) {
  console.error('REPLICATE_API_TOKEN not set. Create a .env file in the project root.')
  process.exit(1)
}

const MODEL_REF = 'richardjiang736/musicgen_lyre_0_new:c9d5b3c81d3485241c909bdbfa21ffbade001f14c4ede8fce55a5d7b98680976'

const DEFAULT_DURATION = 30
const DEFAULT_TEMPERATURE = 1.0
const DEFAULT_CFG = 3
const DEFAULT_TOP_K = 250

const STATUS_MESSAGES = {
  starting: 'Summoning the Muses…',
  processing: 'The lyre strings begin to hum…',
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString()))
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
}

function sendSSE(res, event, data) {
  res.write(`event: ${event}\n`)
  res.write(`data: ${JSON.stringify(data)}\n\n`)
}

export default function apiPlugin() {
  const replicate = new Replicate({ auth: REPLICATE_API_TOKEN })

  return {
    name: 'homeric-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method === 'GET' && req.url === '/api/health') {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ status: 'ok' }))
          return
        }

        if (req.method === 'POST' && req.url === '/api/generate') {
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/event-stream')
          res.setHeader('Cache-Control', 'no-cache')
          res.setHeader('Connection', 'keep-alive')
          res.setHeader('X-Accel-Buffering', 'no')

          try {
            const body = await readBody(req)

            const prediction = await replicate.predictions.create({
              model: 'richardjiang736/musicgen_lyre_0_new',
              version: 'c9d5b3c81d3485241c909bdbfa21ffbade001f14c4ede8fce55a5d7b98680976',
              input: {
                prompt: body.prompt,
                duration: body.duration ?? DEFAULT_DURATION,
                temperature: body.temperature ?? DEFAULT_TEMPERATURE,
                classifier_free_guidance: Math.round(body.classifier_free_guidance ?? DEFAULT_CFG),
                top_k: body.top_k ?? DEFAULT_TOP_K,
              },
            })

            let lastStatus = prediction.status
            sendSSE(res, 'status', { message: STATUS_MESSAGES.starting })

            while (prediction.status !== 'succeeded' && prediction.status !== 'failed' && prediction.status !== 'canceled') {
              await new Promise((r) => setTimeout(r, 2000))

              const updated = await replicate.predictions.get(prediction.id)

              if (updated.status !== lastStatus) {
                lastStatus = updated.status
                const msg = STATUS_MESSAGES[updated.status]
                if (msg) sendSSE(res, 'status', { message: msg })
              }

              prediction.status = updated.status
              prediction.output = updated.output
              prediction.error = updated.error
            }

            if (prediction.status === 'succeeded') {
              sendSSE(res, 'result', { audio_url: prediction.output, prompt: body.prompt })
            } else {
              sendSSE(res, 'error', { message: prediction.error || 'Generation failed' })
            }
          } catch (err) {
            sendSSE(res, 'error', { message: err.message })
          }

          res.end()
          return
        }

        next()
      })
    },
  }
}
