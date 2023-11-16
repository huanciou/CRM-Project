import express from 'express';
import './config/dotenv.js';
import './config/db.js';

const app = express();
const { SERVER_PORT } = process.env;

app.get('/', (req, res) => {
  res.send('homepage');
});

app.listen(SERVER_PORT, () => {
  console.log('Server is running on port: 3000');
});
