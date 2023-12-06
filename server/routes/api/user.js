import { Router } from 'express';
import {
  fetchProfile,
  fetchCard,
  fetchCredits,
  fetchHistory,
  fetchStoreInfo,
} from '../../controllers/api/user/profile.js';

import authorization from '../../middleware/authorization.js';

const router = Router();

router.route('/profile').get(authorization, fetchProfile);
router.route('/profile/card').get(fetchCard);

router.route('/fetchCredits').get(authorization, fetchCredits); // user model
router.route('/fetchHistory').get(authorization, fetchHistory); // user model
router.route('/fetchStoreInfo').get(authorization, fetchStoreInfo); // setup model

export default router;
