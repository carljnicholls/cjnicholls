# cjnicholls

Personal portfolio site — Vue 3 + Vite + TypeScript + Tailwind CSS v4.

## Setup

```sh
npm install
```

## Development

```sh
npm run dev        # dev server with hot reload
npm run build      # type-check + production build
npm run test:unit  # run tests (vitest)
npm run lint       # lint (oxlint + eslint)
npm run format     # format code (prettier)
```

## Image processing

Source images live in `public/<name>/`. To generate responsive variants (WebP/AVIF/JPEG at multiple widths):

```sh
# Default: WebP at 400w, 800w, 1200w, quality 80
npm run images -- --dir public/corgi

# Custom sizes, format, quality
npm run images -- --dir public/photos --sizes 300,600,1200 --format avif --quality 85
```

Generated variants are named `<base>-<width>w.<ext>` and placed alongside the source images. Files with a hyphen in the name are skipped (so generated variants aren't re-processed).

| Option | Default | Description |
|--------|---------|-------------|
| `--dir` | *(required)* | Directory under `public/` with source images |
| `--sizes` | `400,800,1200` | Output widths (comma-separated px) |
| `--format` | `webp` | Output format: `webp`, `avif`, `jpeg`, `jpg`, `png` |
| `--quality` | `80` | Output quality (1–100) |

## Tech stack

- Vue 3.5, Vite 8, TypeScript ~6.0
- Tailwind CSS v4 (Vite plugin)
- Vue Router v5 (hash mode, for GitHub Pages)
- sharp for image processing
- Vitest, oxlint, ESLint, Prettier
