// Servidor local de vista previa. Solo sirve una lista explícita de archivos públicos.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/script.js', ['script.js', 'text/javascript; charset=utf-8']],
  ['/logo-seal.jpg', ['logo-seal.jpg', 'image/jpeg']]
]);
createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const asset = files.get(pathname);
  if (!asset) { response.writeHead(404); response.end('No encontrado'); return; }
  try {
    const content = await readFile(new URL(asset[0], root));
    response.writeHead(200, { 'Content-Type': asset[1], 'Cache-Control': 'no-store' });
    response.end(content);
  } catch { response.writeHead(500); response.end('No se pudo cargar el archivo'); }
}).listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
