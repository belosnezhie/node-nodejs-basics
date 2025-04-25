import { dirname, join, sep } from 'path';
import { release, version } from 'os';
import { createServer } from 'http';
import('./files/c.cjs');

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathA = join(__dirname, 'files', 'a.json');
const pathB = join(__dirname, 'files', 'b.json');

const random = Math.random();

let unknownObject;

if (random > 0.5) {
  const data = await fs.readFile(pathA, 'utf-8');
  unknownObject = JSON.parse(data);
} else {
  const data = await fs.readFile(pathB, 'utf-8');
  unknownObject = JSON.parse(data);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServer((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export default {
    unknownObject,
    myServer,
};
