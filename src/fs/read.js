import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    try {
      const res = await fs.readFile(join(__dirname, 'files', 'fileToRead.txt'), {
        encoding: 'utf8',
      });
      console.log(res);
    } catch (err) {
      if (err.code === 'ENOENT') {
        throw new Error('FS operation failed');
      }
      throw err;
    }
};

await read();
