import { rename as renameFile, access } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  try {
    await access(join(__dirname, 'files', 'properFilename.md'));
    throw new Error('FS operation failed: properFilename.md already exists');
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }

  renameFile(join(__dirname, 'files', 'wrongFilename.txt'), join(__dirname, 'files', 'properFilename.md'))
  .catch((err) => {
      if (err.code === 'ENOENT') {
          throw new Error('FS operation failed: wrongFilename.txt file does not exist');
      }
      throw err;
  });
};

await rename();
