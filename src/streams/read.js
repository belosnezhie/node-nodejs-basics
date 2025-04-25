import { createReadStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToReadPath = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
  const stream = createReadStream(fileToReadPath, 'utf-8');

  stream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  stream.on('end', () => {
    stream.close();
  })
};

await read();
