import { createWriteStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToWritePath = join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
  const stream = createWriteStream(fileToWritePath, 'utf-8');

  process.stdin.on('data', (chunk) => {
    stream.write(chunk.toString());
  });
};

await write();
