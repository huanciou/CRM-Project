import { Router } from 'express';
import {
  loginAuth,
  getSignIn,
  getCallback,
  getCredit,
  getCoupon,
  getVip,
  getReactRoute,
} from '../controllers/user/profiles.js';

import authentication from '../middleware/authentication.js';

const router = Router();

router.route('/loginAuth').post(loginAuth);
router.route('/signIn').get(getSignIn);
router.route('/signInCallback').get(getCallback);

// router.route('/profile').get(getProfile);
// router.route('/card').get(getCard);
// router.route('/info').get(getInfo);

router.route('/credit').get(getCredit);
router.route('/coupon').get(getCoupon);
router.route('/vip').get(getVip);

router.route('*').get(authentication, getReactRoute);

export default router;
