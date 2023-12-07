import { Router } from 'express';
import {
  loginAuth,
  getSignIn,
  getCallback,
  getReactRoute,
} from '../controllers/user/profiles.js';

import authentication from '../middleware/authentication.js';
import { dbChecker } from '../middleware/dbChecker.js';

const router = Router();

router.route('/loginAuth').post(dbChecker, loginAuth);
router.route('/signIn/:dbToken').get(getSignIn);
router.route('/signInCallback').get(getCallback);

router.route('*').get(authentication, getReactRoute);

export default router;
