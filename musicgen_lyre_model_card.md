# &#x20;MusicGen\_Lyre\_0\_New

**Author**: Richard Jiang

## Overview

This fine‑tuned MusicGen model generates **Ancient Greek lyre instrumentals** with a structured musical form. The model was trained on a curated dataset of several hundred lyre tracks, each annotated for mood, tempo, tonality—and also paired with a global prompt emphasising the desired structure: **melody → variation → return**. The result is a generative system that prioritises **musical form over surface detail**, aiming to capture the essence of traditional lyre compositions.

---

## &#x20;Background & Architecture

This model is built on Meta’s **MusicGen** architecture—a single-stage autoregressive transformer trained over a 32 kHz EnCodec tokenizer using four codebooks at ~50 Hz. MusicGen facilitates controllable music generation from textual prompts, achieving high-quality outputs efficiently ([Replicate][1], [Hugging Face][2]).

---

## &#x20;Intended Use

* **Project Showcase / Research Prototype**: Ideal for demonstrating structured generation of Ancient Greek lyre-style music.
* **Educational & Cultural Preservation**: Useful for researchers exploring AI-driven preservation and regeneration of traditional music.

Not intended for commercial distribution under current license constraints.

---

## &#x20;Usage Instructions

YYou can run this model via the Replicate API:

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
    "top_p": 0.0
  }
)
print(output)
```

**Parameters:**

* `duration`: Typically 30 seconds; can be extended via continuation logic.
* `temperature`, `top_k`, `top_p`: Standard sampling controls for diversity versus structure.

---

## &#x20;Model Evaluation & Analysis

* **Baseline Output**: Early results show recognizable motif → variation → return structure, with room for tonal refinement.
* **Structural coherence**: Does the generated track follow the three-part arrangement?  
* **Stylistic fidelity**: Does the timbre approximate lyre-like qualities?
* **Iteration Strategy**:

  * TTest with explicit prompts vs. style-only prompts to measure reliance on `one_same_description`.  - SSweep CFG values to balance creativity and prompt adherence.  - CComparative listening across modal changes (Aeolian, Dorian, etc.)

---

## &#x20;Ethical & Cultural Considerations

* **Cultural Respect**: This model is trained on publicly available Ancient Greek lyre recordings and annotations. While generative in nature, it does not claim authenticity or replicate living tradition.
* **Access & Democratization**: The model aims to make traditional musical forms accessible and regenerable, not to replace human performance or scholarship.
* **Licensing**: Built upon MusicGen weights licensed under CC‑BY‑NC. Use of outputs may be restricted for non-commercial purposes([news.ycombinator.com][3], [Replicate][1], [Hugging Face][2])
* **Limitations**: This is a proof-of-concept tool—user caution advised when interpreting generated content as historically accurate.

---

## &#x20;References

* CCopet et al., *Simple and Controllable Music Generation* (AudioCraft / MusicGen architecture)([arXiv][4])
* MMeta’s MusicGen README on Replicate platform([Replicate][1])
* AAudioCraft / Hugging Face documentation on MusicGen usage and architecture([Hugging Face][2])

---

## &#x20;Model Card

| Feature          | Details                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------- |
| Dataset          | ~100 Ancient Greek lyre tracks, manually labelled and structurally guided              |
| Fine-tune method | Dual-labelling with `one_same_description` + per-file `.txt` prompts                    |
| Languages        | English prompts; model outputs music                                                    |
| Evaluation       | Listening tests, CFG sweeps, mode variation consistency                                 |
| Limitations      | Short audio length (\~30 s), moderate fidelity, cultural approximation                  |
| Known biases     | Limited to style and structure in training data; not ethnomusicologically authoritative |

---

## &#x20;Future Directions

* Expand dataset with longer and more varied lyre recordings.
* Integrate **audio as conditioning seed** to test continuation-based prompting.
* Collaborate with ethnomusicologists to fine-tune model’s stylistic authenticity.
* Develop interactive demos comparing human-performed lyre tracks vs. generated outputs.

---

## &#x20;Contact & Citation

To cite or collaborate:

**Richard Jiang**
[Replicate Model Page](https://replicate.com/richardjiang736/musicgen_lyre_0_new)

**Email**: richardjiang736@gmail.com

If you publish work based on this model, a citation would be appreciated.

---

Thank you for exploring **MusicGen\_Lyre\_0\_New**. This is an experimental step toward **AI‑powered cultural preservation**, with structure baked in—and variation inspired.


[1]: https://replicate.com/meta/musicgen?utm_source=chatgpt.com "meta/musicgen | Run with an API on Replicate"
[2]: https://huggingface.co/spaces/facebook/MusicGen/blob/9cae843238aad3f5c7695a40c9ee77c42dd87aaf/docs/MUSICGEN.md?utm_source=chatgpt.com "MusicGen: Simple and Controllable Music Generation - Hugging Face"
[3]: https://news.ycombinator.com/item?id=36972347&utm_source=chatgpt.com "Open-sourcing AudioCraft: Generative AI for audio | Hacker News"
[4]: https://arxiv.org/abs/2306.05284?utm_source=chatgpt.com "Simple and Controllable Music Generation"