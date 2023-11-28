import { Router } from 'express';
import { fetchProfile, fetchCard } from '../../controllers/api/user/profile.js';

import authorization from '../../middleware/authorization.js';

const router = Router();

router.route('/profile').get(authorization, fetchProfile);
router.route('/profile/card').get(fetchCard);

export default router;
