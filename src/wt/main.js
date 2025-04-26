import { cpus } from 'os';
import { Worker } from 'worker_threads';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const workersFile = join(__dirname, 'worker.js');

const performCalculations = async () => {
  const numOfWorkers = cpus().length;
  const workers = [];
  const res = [];

  for (let i = 0; i < numOfWorkers; i++) {
    const worker = new Worker(workersFile, {
      workerData: 10 + i
    });

    const workerResult = new Promise((resolve) => {
      worker.on('message', (data) => {
        resolve({ status: 'resolved', data });
      });

      worker.on('error', () => {
        resolve({ status: 'error', data: null });
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          resolve({ status: 'error', data: null });
        }
      });
    });

    workers.push(workerResult);
  }

  const allRes = await Promise.allSettled(workers);

  allRes.forEach((result) => {
    if (result.status === 'fulfilled') {
      res.push(result.value);
    }
  });

  console.log(res);
};

await performCalculations();
