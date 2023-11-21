import { Router } from 'express';
import {
  postLogin,
  postSetup,
  postAuth,
} from '../../controllers/admin/setup.js';

import {
  createMenuCategory,
  createMenuContent,
  deleteMenuCategory,
  deleteMenuContent,
  getMenuByCategories,
} from '../../controllers/api/admin/menu.js';

import createOrder from '../../controllers/api/admin/order.js';
// import { postCheckout } from '../../controllers/api/admin/checkout.js';
import fieldsUpload from '../../utils/fieldsUpload.js';

const router = Router();

router.route('/login').post(postLogin);

router.route('/setup').post(postSetup);

router.route('/auth').post(postAuth);

router.route('/admin/createMenuCategory').post(createMenuCategory);

router.route('/admin/createMenuContent').post(fieldsUpload, createMenuContent);

router.route('/admin/deleteMeunCategory').post(deleteMenuCategory);

router.route('/admin/deleteMeunContent').post(deleteMenuContent);

router.route('/admin/getMenuByCategories').get(getMenuByCategories);

router.route('/admin/createOrder').post(createOrder);

router.route('/admin/checkout').post();

export default router;
