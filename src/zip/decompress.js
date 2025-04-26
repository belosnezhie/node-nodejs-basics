import { createWriteStream, createReadStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'files', 'fileToCompress.txt');
const archivePath = join(__dirname, 'files', 'archive.gz');

const decompress = async () => {
  const readStream = createReadStream(archivePath);
  const gunzipStream = createGunzip();
  const writeStream = createWriteStream(filePath);

  try {
    await pipeline(
      readStream,
      gunzipStream,
      writeStream
    );
  } catch (err) {
    console.error('An error occurred:', err);
  }
};

await decompress();
