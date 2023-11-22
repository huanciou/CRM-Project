import { Router } from 'express';
import {
  postLogin,
  postSetup,
  postAuth,
} from '../../controllers/admin/setup.js';

import {
  createMenuCategory,
  createMenuContents,
  deleteMenuCategory,
  deleteMenuContent,
  fetchMenuByCategories,
  fetchMenuCategories,
} from '../../controllers/api/admin/menu.js';

import { createOrder, fetchOrder } from '../../controllers/api/admin/order.js';
import fieldsUpload from '../../utils/fieldsUpload.js';

const router = Router();

router.route('/login').post(postLogin);

router.route('/setup').post(postSetup);

router.route('/auth').post(postAuth);

router.route('/admin/createMenuCategory').post(createMenuCategory);

router
  .route('/admin/createMenuContents')
  .post(fieldsUpload, createMenuContents);

router.route('/admin/fetchMenuCategories').get(fetchMenuCategories);

router.route('/admin/deleteMeunCategory').post(deleteMenuCategory);

router.route('/admin/deleteMeunContent').post(deleteMenuContent);

router.route('/admin/fetchMenuByCategories').get(fetchMenuByCategories);

router.route('/admin/fetchOrder').get(fetchOrder);

router.route('/admin/createOrder').post(createOrder);

export default router;
