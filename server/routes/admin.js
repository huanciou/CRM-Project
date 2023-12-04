import { Router } from 'express';
import { getLogin, getSetup } from '../controllers/admin/setup.js';
import { getMenuSetup, getMenu } from '../controllers/admin/menu.js';
import { getCheckout, getCheckoutByID } from '../controllers/admin/checkout.js';
import getOrder from '../controllers/admin/order.js';
import authentication from '../middleware/authentication.js';
import { getAdminSignUp } from '../controllers/api/admin/adminSignUp.js';

const router = Router();

router.route('/login').get(getLogin);

router.route('/setup').get(authentication, getSetup);

router.route('/menuSetup').get(authentication, getMenuSetup);

router.route('/menu').get(authentication, getMenu);

router.route('/order').get(authentication, getOrder);

router.route('/checkout').get(authentication, getCheckout);

router.route('/checkout/:id').get(authentication, getCheckoutByID);

router.route('/adminSignUp').get(getAdminSignUp);

export default router;
