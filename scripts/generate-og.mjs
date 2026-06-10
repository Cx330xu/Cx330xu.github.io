import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svg = readFileSync(join(root, 'public/og-image.svg'));

await sharp(svg).resize(1200, 630).png().toFile(join(root, 'public/og-image.png'));

console.log('Generated public/og-image.png');
