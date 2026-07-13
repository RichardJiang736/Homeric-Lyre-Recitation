# MusicGen Lyre — Ancient Greek Lyre Music Generation

A fine-tuned MusicGen model that generates Ancient Greek lyre instrumentals with structured musical form (melody → variation → return). Built as a research prototype for AI-powered cultural preservation.

## Architecture

Built on Meta's **MusicGen** — a single-stage autoregressive transformer over a 32 kHz EnCodec tokenizer using four codebooks at ~50 Hz. The model was fine-tuned on a curated dataset of several hundred lyre tracks, each annotated for mood, tempo, tonality, and paired with a structural prompt.

## Features

- **Structured Generation** — Produces tracks following a deliberate three-part form: motif introduction, variation, and thematic return.
- **Modal Control** — Prompt-based support for Ancient Greek modes (Aeolian, Dorian, etc.) to explore different tonal palettes.
- **Controllable Sampling** — Standard parameters (temperature, top-k, top-p, classifier-free guidance) for tuning creativity vs. structure.

## Usage

```python
import replicate

output = replicate.run(
    "richardjiang736/musicgen_lyre_0_new:latest",
    input={
        "prompt": "medieval-flavoured lyre melody in Aeolian mode, clear motif then variation then return",
        "duration": 30,
        "classifier_free_guidance": 3.5,
        "temperature": 1.0,
        "top_k": 250,
        "top_p": 0.0,
    },
)
print(output)
```

**Parameters:**

| Parameter | Description |
|---|---|
| `duration` | Typically 30 seconds; can be extended via continuation logic |
| `temperature` | Sampling diversity (higher = more variation) |
| `top_k` | Limits sampling to top-k tokens |
| `top_p` | Nucleus sampling threshold |
| `classifier_free_guidance` | Balances creativity and prompt adherence |

## Model Details

| Feature | Details |
|---|---|
| Base architecture | MusicGen (AudioCraft) |
| Dataset | ~100 Ancient Greek lyre tracks, manually labelled |
| Fine-tune method | Dual-labelling with global `one_same_description` + per-file `.txt` prompts |
| Languages | English prompts; model outputs music |
| Evaluation | Listening tests, CFG sweeps, mode variation consistency |
| Limitations | Short audio length (~30 s), moderate fidelity, cultural approximation |
| Known biases | Limited to style and structure in training data; not ethnomusicologically authoritative |

## Ethical Considerations

- **Cultural Respect**: Trained on publicly available recordings; does not claim authenticity or replicate living tradition.
- **Licensing**: Built on MusicGen weights licensed under CC-BY-NC. Outputs restricted to non-commercial use.
- **Limitations**: This is a proof-of-concept — generated content should not be interpreted as historically accurate.

## Future Directions

- Expand dataset with longer and more varied lyre recordings.
- Integrate audio as conditioning seed for continuation-based prompting.
- Collaborate with ethnomusicologists to improve stylistic authenticity.
- Develop interactive demos comparing human-performed vs. generated lyre tracks.

## Contact

**Richard Jiang**
[Replicate Model Page](https://replicate.com/richardjiang736/musicgen_lyre_0_new)
richardjiang736@gmail.com

If you publish work based on this model, a citation would be appreciated.
