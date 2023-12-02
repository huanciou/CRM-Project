import { Router } from 'express';
import { getLogin, getSetup, getAuth } from '../controllers/admin/setup.js';

import { getMenuSetup, getMenu } from '../controllers/admin/menu.js';

import { getCheckout, getCheckoutByID } from '../controllers/admin/checkout.js';
import getOrder from '../controllers/admin/order.js';

const router = Router();

router.route('/login').get(getLogin);

router.route('/setup').get(getSetup);

router.route('/auth').get(getAuth);

router.route('/menuSetup').get(getMenuSetup);

router.route('/menu').get(getMenu);

router.route('/order').get(getOrder);

router.route('/checkout').get(getCheckout);

router.route('/checkout/:id').get(getCheckoutByID);

export default router;
