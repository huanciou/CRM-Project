import { Router } from 'express';
import { postLogin, postAuth } from '../../controllers/admin/setup.js';

import {
  createMenuCategory,
  createMenuTags,
  createMenuContents,
  deleteMenuCategory,
  deleteMenuTag,
  deleteMenuContent,
  fetchMenuByCategories,
  fetchMenuCategories,
  fetchMenuTags,
} from '../../controllers/api/admin/menu.js';

import {
  createOrder,
  fetchOrder,
  deleteOrder,
  fetchDashboard,
} from '../../controllers/api/admin/order.js';

import { getMenu } from '../../controllers/admin/menu.js';
import { postCheckout } from '../../controllers/api/admin/checkout.js';
import fieldsUpload from '../../utils/fieldsUpload.js';

import { postAdminSignUp } from '../../controllers/api/admin/adminSignUp.js';
import { fetchSetup, postSetup } from '../../controllers/api/admin/setUp.js';
import { dbChecker } from '../../middleware/dbChecker.js';
import authentication from '../../middleware/authentication.js';

const router = Router();

router.route('/login').post(postLogin);

router.route('/auth').get(authentication, (req, res) => {
  res.status(200).send({ authenticated: true });
});

router.route('/setup').patch(dbChecker, postSetup);
router.route('/fetchSetup').get(dbChecker, fetchSetup);

router.route('/auth').post(postAuth);

router.route('/createMenuCategory').post(dbChecker, createMenuCategory);

router.route('/createMenuTags').post(dbChecker, createMenuTags);

router
  .route('/createMenuContents')
  .post(dbChecker, fieldsUpload, createMenuContents);

router.route('/fetchMenuCategories').get(dbChecker, fetchMenuCategories);

router.route('/fetchMenuTags').get(dbChecker, fetchMenuTags);

router.route('/deleteMenuTag').delete(dbChecker, deleteMenuTag);

router.route('/deleteMenuCategory').delete(dbChecker, deleteMenuCategory);

router.route('/deleteMenuContent').delete(dbChecker, deleteMenuContent);

router.route('/fetchMenuByCategories').get(dbChecker, fetchMenuByCategories);

router.route('/fetchOrder').get(dbChecker, fetchOrder);

router.route('/createOrder').post(dbChecker, createOrder);

router.route('/deleteOrder').delete(dbChecker, deleteOrder);

router.route('/postCheckout').post(dbChecker, postCheckout);

router.route('/adminSignUp').post(dbChecker, postAdminSignUp);

router.route('/fetchDashboard').post(dbChecker, fetchDashboard);

router.route('/menu').get(dbChecker, getMenu);

export default router;
