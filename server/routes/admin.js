import { Router } from 'express';
import {
  getLogin,
  postLogin,
  getSetup,
  postSetup,
  getAuth,
  postAuth,
} from '../controllers/admin/setup.js';

import {
  getMenuSetup,
  postMenuSetup,
  getMenuEdition,
  postMenuEdition,
  postDeleteMeunCategory,
  getMenu,
  postMenu,
} from '../controllers/admin/menu.js';

import { getOrder, postOrder } from '../controllers/admin/order.js';
import { getCheckout, postCheckout } from '../controllers/admin/checkout.js';
import fieldsUpload from '../utils/fieldsUpload.js';

const router = Router();

router.route('/login').get(getLogin);
router.route('/login').post(postLogin);

router.route('/setup').get(getSetup);
router.route('/setup').post(postSetup);

router.route('/auth').get(getAuth);
router.route('/auth').post(postAuth);

router.route('/menuSetup').get(getMenuSetup);
router.route('/menuSetup').post(postMenuSetup);

router.route('/menuEdition').get(getMenuEdition);
router.route('/menuEdition').post(fieldsUpload, postMenuEdition);
router.route('/deleteMeunCategory').post(postDeleteMeunCategory);

router.route('/menu').get(getMenu);
router.route('/menu').post(postMenu);

router.route('/order').get(getOrder);
router.route('/order').post(postOrder);

router.route('/checkout').get(getCheckout);
router.route('/checkout').post(postCheckout);

export default router;
