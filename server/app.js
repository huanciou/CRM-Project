import express from 'express';
import './config/dotenv.js';
import './config/db.js';
import profileRouter from './routes/profile.js';
import adminRouter from './routes/admin.js';
import apiRouter from './routes/api/admin.js';

import './models/menuSchema.js';
import './models/orderSchema.js';
import './models/profileSchema.js';
import './models/setupSchema.js';
import './middleware/multer.js';

const app = express();
const { SERVER_PORT } = process.env;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/1.0', apiRouter);
app.use('/profile', profileRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  res.send('homepage');
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port: ${SERVER_PORT}`);
});
