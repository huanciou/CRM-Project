import { Router } from 'express';
import {
  getCredit,
  getCoupon,
  getInfo,
  getVip,
} from '../controllers/user/profiles.js';

const router = Router();

router.route('/').get();
router.route('/credit').get(getCredit);
router.route('/coupon').get(getCoupon);
router.route('/info').get(getInfo);
router.route('/vip').get(getVip);

export default router;
