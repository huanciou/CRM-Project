import { Router } from 'express';
import { getLogin, getSetup, getAuth } from '../controllers/admin/setup.js';

import {
  getMenuSetup,
  getMenuEdition,
  getMenu,
} from '../controllers/admin/menu.js';

// import { getCheckout } from '../controllers/admin/checkout.js';
import getOrder from '../controllers/admin/order.js';

const router = Router();

router.route('/login').get(getLogin);

router.route('/setup').get(getSetup);

router.route('/auth').get(getAuth);

router.route('/menuSetup').get(getMenuSetup);

router.route('/menuEdition').get(getMenuEdition);

router.route('/menu').get(getMenu);

router.route('/order').get(getOrder);

router.route('/checkout').get();

export default router;
