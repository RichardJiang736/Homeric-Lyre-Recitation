# MusicGen Lyre Dataset

108 Ancient Greek lyre instrumental tracks with per-track prompt annotations. Used to fine-tune Meta's MusicGen for structured lyre music generation.

## Structure

```
data/raw/
├── audio/              # 001.mp3 .. 108.mp3  (108 tracks)
└── prompts/            # 001.txt .. 108.txt  (per-track label tags)
data/splits.json        # 86 train / 11 val / 11 test (seed=42)
```

## Annotation Format

Each `.txt` file contains a comma-separated tag string:

```
ancient, instrumental, acoustic, lyre, 130 bpm, expressive, fluid, contemplative, G Major
```

Tags include: era, genre, instrument, tempo (bpm), mood descriptors, key/tonality.

## Source

Publicly available lyre recordings, manually curated and labelled.

## License

Outputs restricted to non-commercial use per the underlying MusicGen weights (CC-BY-NC).

## Citation

If you use this dataset, please cite the MusicGen Lyre project page on Replicate.
