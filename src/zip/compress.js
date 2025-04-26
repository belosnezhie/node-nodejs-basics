import { createWriteStream, createReadStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToCompressPath = join(__dirname, 'files', 'fileToCompress.txt');
const filePath = join(__dirname, 'files', 'archive.gz');

const compress = async () => {

  async function do_gzip(input, output) {
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    const gzip = createGzip();

    await pipeline(source, gzip, destination);
  }

  return await do_gzip(fileToCompressPath, filePath)
    .catch((err) => {
      console.error('An error occurred:', err);
      process.exitCode = 1;
    });
};

await compress();
