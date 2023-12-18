import express from 'express';
import './config/dotenv.js';
// import './config/db.js';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import profileRouter from './routes/user.js';
import adminRouter from './routes/admin.js';
import apiAdminRouter from './routes/api/admin.js';
import apiUserRouter from './routes/api/user.js';
import lineRouter from './routes/line.js';

import './models/menuSchema.js';
import './models/orderSchema.js';
import './models/profileSchema.js';
import './models/setupSchema.js';
import './middleware/multer.js';

const app = express();
const { SERVER_PORT } = process.env;

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static('public'));
app.use(express.static(path.resolve('public', 'build')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/line', lineRouter); // Need to set tihs middleware before bodyParser
app.use(express.json());

app.use('/api/1.0/admin', apiAdminRouter);
app.use('/api/1.0/user', apiUserRouter);
app.use('/user', profileRouter);
app.use('/admin', adminRouter);

// app.get('/', (req, res) => {
//   res.send('homepage');
// });

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port: ${SERVER_PORT}`);
});
