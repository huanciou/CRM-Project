import { encrypt } from '../../../utils/encrypt.js';
import admin from '../../../models/adminSchema.js';

export function getAdminSignUp(req, res) {
  res.render('admin/signUP');
}

export async function postAdminSignUp(req, res) {
  const { account, password, name } = req.body;
  const hashPassword = await encrypt(password, 10);

  const user = {
    name,
    account,
    password: hashPassword,
  };
  const userCreated = await admin.create(user);
  console.log(userCreated);

  res.send('ok');
}
