import { Router } from 'express';
import { fetchProfile } from '../../controllers/api/user/profile.js';

import authorization from '../../middleware/authorization.js';

const router = Router();

router.route('/profile').get(authorization, fetchProfile);

export default router;
