import { cp, access } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  const src = join(__dirname, 'files');
  const dest = join(__dirname, 'files_copy');

  try {
    await access(src);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed: files folder doesn not exist');
    }
    throw err;
  }

  try {
    await access(dest);
    throw new Error('FS operation failed: files_copy has already been created');
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }

  try {
    await cp(src, dest, {
      recursive: true,
      errorOnExist: true,
      force: false
    });
  } catch (err) {
      throw err;
  }
};

await copy();
