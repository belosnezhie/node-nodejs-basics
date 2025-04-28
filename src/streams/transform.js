import { Transform } from 'stream';

const transform = async () => {
  const stream = new Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split('').reverse().join('');
      callback(null, reversed);
    }
  });

  process.stdin.pipe(stream).pipe(process.stdout);};

await transform();
