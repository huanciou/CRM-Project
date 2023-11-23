import { Router } from 'express';
import line from '@line/bot-sdk';
import chatBOTCallback from '../controllers/line.js';

const router = Router();
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

router.route('/callback').post(line.middleware(config), chatBOTCallback);

export default router;
