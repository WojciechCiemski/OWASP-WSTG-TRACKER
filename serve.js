import http from 'node:http';
import { createReadStream } from 'node:fs';
import { extname, resolve } from 'node:path';
import { promises as fs } from 'node:fs';

const port = process.env.PORT ? Number(process.env.PORT) : 4173;
const host = '0.0.0.0';
const rootDir = resolve('.');

const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

async function fileExists(path) {
  try {
    const stats = await fs.stat(path);
    return stats.isFile();
  } catch (error) {
    return false;
  }
}

function send(response, statusCode, body, headers = {}) {
  response.writeHead(statusCode, headers);
  response.end(body);
}

const server = http.createServer(async (request, response) => {
  const rawPath = request.url === '/' ? '/index.html' : request.url.split('?')[0];
  const decodedPath = decodeURIComponent(rawPath);
  const safePath = resolve(rootDir, `.${decodedPath}`);

  if (!safePath.startsWith(rootDir)) {
    send(response, 403, '403 Forbidden', { 'Content-Type': 'text/plain; charset=UTF-8' });
    return;
  }

  if (!(await fileExists(safePath))) {
    send(response, 404, '404 Not Found', { 'Content-Type': 'text/plain; charset=UTF-8' });
    return;
  }

  const extension = extname(safePath).toLowerCase();
  const contentType = mimeTypes[extension] || 'application/octet-stream';
  response.writeHead(200, { 'Content-Type': contentType });
  createReadStream(safePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Static site available at http://${host}:${port}`);
});
