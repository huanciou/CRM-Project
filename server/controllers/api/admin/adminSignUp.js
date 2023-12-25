import { encrypt } from '../../../utils/encrypt.js';
import getModels from '../../../models/modelHelper.js';

export function getAdminSignUp(req, res) {
  res.render('admin/signUP');
}

export async function postAdminSignUp(req, res, next) {
  try {
    const { account, password, name } = req.body;
    const { dbToken } = req;
    const { admin } = await getModels(dbToken);
    const hashPassword = await encrypt(password, 10);

    const user = {
      name,
      account,
      password: hashPassword,
    };
    const userCreated = await admin.create(user);
    console.log(userCreated);

    res.send('ok');
  } catch (err) {
    next(new Error('Admin Sign Up Failed'));
  }
}
