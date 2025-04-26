import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const scriptFile = join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const child = spawn('node', [scriptFile, ...args], {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
  })

  child.on('message', function (data) {
    console.log(data);
  });
};

spawnChildProcess( ['a', 'b' , 'c']);
