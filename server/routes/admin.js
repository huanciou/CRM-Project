import { Router } from 'express';
import { getLogin, getSetup, getHomepage } from '../controllers/admin/setup.js';
import { getMenuSetup } from '../controllers/admin/menu.js';
import { getCheckout, getCheckoutByID } from '../controllers/admin/checkout.js';
import { getOrder, getDashboard } from '../controllers/admin/order.js';
import authentication from '../middleware/authentication.js';
import { getAdminSignUp } from '../controllers/api/admin/adminSignUp.js';
import { dbChecker } from '../middleware/dbChecker.js';

const router = Router();

router.route('/login').get(getLogin);

router.route('/setup').get(authentication, dbChecker, getSetup);

router.route('/homepage').get(authentication, dbChecker, getHomepage);

router.route('/menuSetup').get(authentication, dbChecker, getMenuSetup);

router.route('/order').get(authentication, dbChecker, getOrder);

router.route('/checkout').get(authentication, dbChecker, getCheckout);

router.route('/checkout/:id').get(authentication, dbChecker, getCheckoutByID);

router.route('/adminSignUp').get(getAdminSignUp);

router.route('/dashboard').get(authentication, dbChecker, getDashboard);

export default router;
