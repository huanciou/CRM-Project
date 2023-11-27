import { Router } from 'express';
import {
  loginAuth,
  getSignIn,
  getCallback,
  getCredit,
  getCoupon,
  getInfo,
  getVip,
  getCard,
} from '../controllers/user/profiles.js';

const router = Router();

router.route('/loginAuth').post(loginAuth);
router.route('/signIn').get(getSignIn);
router.route('/signInCallback').get(getCallback);

router.route('/card').get(getCard);
router.route('/info').get(getInfo);

router.route('/credit').get(getCredit);
router.route('/coupon').get(getCoupon);
router.route('/vip').get(getVip);

export default router;
