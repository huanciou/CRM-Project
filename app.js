import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('homepage');
});

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server is running on port: 3000');
});
