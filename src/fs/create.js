import { writeFile, access } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const fileName = join(__dirname, 'files', 'fresh.txt');
  const content = 'I am fresh and young';

  try {
    await access(fileName);
    throw new Error('FS operation failed: fresh.txt has already been created');
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }

  try {
    await writeFile(fileName, content);
  } catch (err) {
    throw err;
  }
};

await create();
