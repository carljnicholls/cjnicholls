import { parseArgs } from 'node:util'
import { readdirSync } from 'node:fs'
import { join, basename, extname } from 'node:path'
import sharp from 'sharp'

const VALID_FORMATS = ['webp', 'avif', 'jpeg', 'jpg', 'png']

const { values } = parseArgs({
  options: {
    dir: { type: 'string' },
    sizes: { type: 'string', default: '400,800,1200' },
    quality: { type: 'string', default: '80' },
    format: { type: 'string', default: 'webp' },
  },
})

if (!values.dir) {
  console.error('Error: --dir <path> is required')
  process.exit(1)
}

const dir = values.dir
const sizes = (values.sizes ?? '400,800,1200').split(',').map(Number)
const quality = Number(values.quality ?? '80')
const format = (values.format ?? 'webp').toLowerCase()

if (!VALID_FORMATS.includes(format)) {
  console.error(`Error: --format must be one of: ${VALID_FORMATS.join(', ')}`)
  process.exit(1)
}

if (sizes.some((s) => isNaN(s) || s <= 0)) {
  console.error('Error: --sizes must be comma-separated positive integers (e.g. 400,800,1200)')
  process.exit(1)
}

if (isNaN(quality) || quality < 1 || quality > 100) {
  console.error('Error: --quality must be a number between 1 and 100')
  process.exit(1)
}

const SOURCE_EXTS = /\.(jpg|jpeg|png)$/i

const files = readdirSync(dir).filter(
  (f) => SOURCE_EXTS.test(f) && !f.includes('-'),
)

if (files.length === 0) {
  console.log(`No source images found in ${dir}/ (looked for .jpg, .jpeg, .png without '-' in name)`)
  process.exit(0)
}

console.log(`Source: ${dir}/ (${files.length} images)`)
console.log(`Format: ${format}, Quality: ${quality}, Sizes: ${sizes.join('w, ')}w\n`)

for (const file of files) {
  const name = basename(file, extname(file))
  const srcPath = join(dir, file)

  for (const width of sizes) {
    const outName = `${name}-${width}w.${format === 'jpg' ? 'jpeg' : format}`
    const outPath = join(dir, outName)
    await sharp(srcPath)
      .resize(width)
      [format === 'jpg' ? 'jpeg' : format]({ quality })
      .toFile(outPath)
    console.log(`  ${outName}`)
  }
  console.log()
}

console.log('Done!')
