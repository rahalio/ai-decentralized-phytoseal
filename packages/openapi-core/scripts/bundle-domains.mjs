#!/usr/bin/env node
/**
 * Bundle every Redocly API into src/.bundled/{name}.json (+ .openapi.yaml).
 */
import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(root, '..');
const bundled = join(pkgRoot, 'src', '.bundled');
mkdirSync(bundled, { recursive: true });

const domains = [
  'identity',
  'port-parties',
  'certificates',
  'amendments',
  'classifications',
  'legal-holds',
  'evidence-packs',
  'metrics',
];

for (const name of domains) {
  for (const [ext, out] of [
    ['yaml', join(bundled, `${name}.openapi.yaml`)],
    ['json', join(bundled, `${name}.json`)],
  ]) {
    const r = spawnSync(
      'pnpm',
      ['exec', 'redocly', 'bundle', name, '--output', out],
      { cwd: pkgRoot, stdio: 'inherit', shell: process.platform === 'win32' }
    );
    if (r.status !== 0) {
      process.exit(r.status ?? 1);
    }
  }
  console.log(`bundled ${name}`);
}
