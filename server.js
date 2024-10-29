import express from 'express';
import { Worker } from 'worker_threads';

const app = express();

let counter = 0;
app.get('/', (req, res) => {
  counter++;
  res.status(200).json({ counter });
});

app.get('/heavy', (req, res) => {
  const worker = new Worker('./worker.js');
  worker.on('message', (data) => {
    res.status(200).json({ total: data });
  });
});

const PORT = 1337;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
