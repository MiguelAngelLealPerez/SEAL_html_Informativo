// Empaqueta únicamente los archivos públicos. No requiere dependencias.
import { mkdir, copyFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'styles.css', 'script.js', 'logo-seal.jpg']) {
  await copyFile(new URL(file, root), new URL(file, output));
}
console.log('Sitio estático listo en dist/.');
