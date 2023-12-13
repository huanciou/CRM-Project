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
import { getMenu } from '../../controllers/admin/menu.js';

const router = Router();

router.route('/profile').get(authorization, dbCheckerInHeaders, fetchProfile);
router.route('/profile/card').get(authorization, dbCheckerInHeaders, fetchCard);

router.route('/menu/:db').get(getMenu);

router
  .route('/fetchCredits')
  .get(authorization, dbCheckerInHeaders, fetchCredits);
router
  .route('/fetchHistory')
  .get(authorization, dbCheckerInHeaders, fetchHistory);
router
  .route('/fetchStoreInfo')
  .get(authorization, dbCheckerInHeaders, fetchStoreInfo);

export default router;
