import connectDB from '../config/db.js';

import adminSchema from './adminSchema.js';
import checkoutSchema from './checkoutSchema.js';
import { menuSchema, menuSetupSchema, tagsSetupSchema } from './menuSchema.js';
import orderSchema from './orderSchema.js';
import { profileSchema, signSchema } from './profileSchema.js';
import setupSchema from './setupSchema.js';
import userSchema from './userSchema.js';

const defaultDB = 'Umai';

async function getModels(dbToken = defaultDB) {
  const connection = await connectDB(dbToken);

  const admin = connection.model('Admin', adminSchema);

  const checkout = connection.model('Checkout', checkoutSchema);

  const menu = connection.model('Manu', menuSchema);
  const menuSetup = connection.model('ManuSetup', menuSetupSchema);

  const order = connection.model('Order', orderSchema);

  const profile = connection.model('Profile', profileSchema);
  const sign = connection.model('Sign', signSchema);

  const setup = connection.model('Setup', setupSchema);

  const user = connection.model('User', userSchema);

  const tags = connection.model('Tag', tagsSetupSchema);

  return {
    admin,
    checkout,
    menu,
    menuSetup,
    order,
    profile,
    sign,
    setup,
    user,
    tags,
  };
}

export default getModels;
