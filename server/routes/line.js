import { Router } from 'express';
import line from '@line/bot-sdk';
import chatBOTCallback from '../controllers/line.js';

const router = Router();
const config = {
  channelAccessToken: process.env.LINE_MESSAGE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_MESSAGE_CHANNEL_SECRET,
};

router.route('/webhook').post(line.middleware(config), chatBOTCallback);

export default router;
