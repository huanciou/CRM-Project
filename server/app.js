import express from 'express';
import http from 'http';
import './config/dotenv.js';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { initSocket } from './utils/socket.js';
import profileRouter from './routes/user.js';
import adminRouter from './routes/admin.js';
import apiAdminRouter from './routes/api/admin.js';
import apiUserRouter from './routes/api/user.js';
import lineRouter from './routes/line.js';
import { errorHandler } from './utils/errorHandler.js';

import './models/menuSchema.js';
import './models/orderSchema.js';
import './models/profileSchema.js';
import './models/setupSchema.js';
import './middleware/multer.js';

const app = express();
const server = http.createServer(app);
const { SERVER_PORT } = process.env;
initSocket(server);

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static('public'));
app.use(express.static(path.resolve('public', 'build')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/line', lineRouter); // Need to set this middleware before bodyParser
app.use(express.json());

app.use('/api/1.0/admin', apiAdminRouter);
app.use('/api/1.0/user', apiUserRouter);
app.use('/user', profileRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  const build = path.resolve('public', 'build');
  res.sendFile(path.join(build, 'index.html'));
});

app.use(errorHandler);

server.listen(SERVER_PORT, () => {
  console.log(`Server is running on port: ${SERVER_PORT}`);
});
