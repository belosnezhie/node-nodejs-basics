import { createReadStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToReadPath = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
  const stream = createReadStream(fileToReadPath, 'utf-8');

  await pipeline(stream, process.stdout, { end: false });
  process.stdout.write('\n');
};

await read();
