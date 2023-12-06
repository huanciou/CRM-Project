import { Router } from 'express';
import { postLogin, postAuth } from '../../controllers/admin/setup.js';

import {
  createMenuCategory,
  createMenuContents,
  deleteMenuCategory,
  deleteMenuContent,
  fetchMenuByCategories,
  fetchMenuCategories,
} from '../../controllers/api/admin/menu.js';

import {
  createOrder,
  fetchOrder,
  deleteOrder,
} from '../../controllers/api/admin/order.js';

import { postCheckout } from '../../controllers/api/admin/checkout.js';
import fieldsUpload from '../../utils/fieldsUpload.js';

import { postAdminSignUp } from '../../controllers/api/admin/adminSignUp.js';
import postSetup from '../../controllers/api/admin/setUp.js';

const router = Router();

router.route('/login').post(postLogin);

router.route('/setup').post(postSetup);

router.route('/auth').post(postAuth);

router.route('/createMenuCategory').post(createMenuCategory);

router.route('/createMenuContents').post(fieldsUpload, createMenuContents);

router.route('/fetchMenuCategories').get(fetchMenuCategories);

router.route('/deleteMeunCategory').post(deleteMenuCategory);

router.route('/deleteMeunContent').post(deleteMenuContent);

router.route('/fetchMenuByCategories').get(fetchMenuByCategories);

router.route('/fetchOrder').get(fetchOrder);

router.route('/createOrder').post(createOrder);

router.route('/deleteOrder').post(deleteOrder);

router.route('/postCheckout').post(postCheckout);

router.route('/adminSignUp').post(postAdminSignUp);

export default router;
