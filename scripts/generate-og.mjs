// @ts-check
import sharp from 'sharp';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');

const W = 1200;
const H = 630;
const PADDING = 60;

// Generate the SVG OG image
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fafafa;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f0f0ff;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)" />
  <circle cx="200" cy="150" r="300" fill="rgba(79,70,229,0.06)" />
  <circle cx="1000" cy="500" r="250" fill="rgba(14,165,233,0.05)" />
  <text x="${W / 2}" y="${PADDING + 80}" font-family="Inter, 'PingFang SC', system-ui, sans-serif" font-size="64" font-weight="bold" fill="#4f46e5" text-anchor="middle">Cx330xu</text>
  <text x="${W / 2}" y="${PADDING + 160}" font-family="Inter, 'PingFang SC', system-ui, sans-serif" font-size="28" fill="#6b7280" text-anchor="middle">AI Agent Engineer · LLM · RAG · Agent</text>
  <text x="${W / 2}" y="${PADDING + 210}" font-family="Inter, 'PingFang SC', system-ui, sans-serif" font-size="22" fill="#9ca3af" text-anchor="middle">Building intelligent systems with code and clarity</text>
  <line x1="${W / 2 - 60}" y1="${H - 100}" x2="${W / 2 + 60}" y2="${H - 100}" stroke="#4f46e5" stroke-width="3" stroke-linecap="round" opacity="0.6" />
  <text x="${W / 2}" y="${H - 60}" font-family="'JetBrains Mono', monospace" font-size="16" fill="#9ca3af" text-anchor="middle">github.com/Cx330xu</text>
</svg>`;

// Ensure public dir exists
if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

// Save SVG as canonical source
const svgPath = join(publicDir, 'og-image.svg');
writeFileSync(svgPath, svgContent);
console.log('✓ Generated public/og-image.svg');

// Convert to PNG
const pngPath = join(publicDir, 'og-image.png');
await sharp(Buffer.from(svgContent)).resize(W, H).png().toFile(pngPath);
console.log('✓ Generated public/og-image.png');
