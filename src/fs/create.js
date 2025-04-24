import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const name = join(__dirname, 'files', 'fresh.txt');
  const content = 'I am fresh and young';

  try {
    await fs.writeFile(name, content);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await create();
