// Comprobaciones estáticas de integridad; no sustituyen pruebas en navegadores.
import { readFile, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { Script } from 'node:vm';
const root = new URL('../', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const css = await readFile(new URL('styles.css', root), 'utf8');
const js = await readFile(new URL('script.js', root), 'utf8');
new Script(js);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(ids.length, new Set(ids).size, 'Hay IDs duplicados');
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  assert(ids.includes(match[1]), `Enlace interno sin destino: ${match[1]}`);
}
for (const match of html.matchAll(/(?:aria-labelledby|aria-controls)="([^"]+)"/g)) {
  for (const id of match[1].split(' ')) assert(ids.includes(id), `Referencia ARIA inexistente: ${id}`);
}
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Debe existir un solo h1');
assert.equal((html.match(/class="metric"/g) || []).length, 6, 'Faltan métricas');
assert.equal((html.match(/class="feature"/g) || []).length, 16, 'Faltan funcionalidades');
assert(html.includes('lang="es-MX"') && html.includes('name="viewport"'));
assert(css.includes('prefers-reduced-motion'));
assert(!/<(?:script|link)[^>]+(?:src|href)="https?:/i.test(html), 'Hay dependencias externas');
let bytes = 0;
for (const file of ['index.html', 'styles.css', 'script.js', 'logo-seal.jpg']) bytes += (await stat(new URL(file, root))).size;
assert(bytes < 300 * 1024, 'El sitio supera el presupuesto de 300 KB sin compresión');
console.log(`Integridad correcta: ${ids.length} IDs únicos, 16 funciones, 6 métricas, ${(bytes / 1024).toFixed(1)} KB sin comprimir y sin dependencias externas.`);
