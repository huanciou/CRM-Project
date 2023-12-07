import { Router } from 'express';
import {
  fetchProfile,
  fetchCard,
  fetchCredits,
  fetchHistory,
  fetchStoreInfo,
} from '../../controllers/api/user/profile.js';

import authorization from '../../middleware/authorization.js';
import { dbCheckerInHeaders } from '../../middleware/dbChecker.js';

const router = Router();

router.route('/profile').get(authorization, dbCheckerInHeaders, fetchProfile);
router.route('/profile/card').get(authorization, dbCheckerInHeaders, fetchCard);

router
  .route('/fetchCredits')
  .get(authorization, dbCheckerInHeaders, fetchCredits); // user model
router
  .route('/fetchHistory')
  .get(authorization, dbCheckerInHeaders, fetchHistory); // user model
router
  .route('/fetchStoreInfo')
  .get(authorization, dbCheckerInHeaders, fetchStoreInfo); // setup model

export default router;
