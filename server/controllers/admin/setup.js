import admin from '../../models/adminSchema.js';
import { compare } from '../../utils/encrypt.js';
import signJWT from '../../utils/signJWT.js';
import switchDatabases from '../../utils/switchDb.js';

export function getLogin(req, res) {
  res.render('admin/login');
}

export async function postLogin(req, res) {
  await switchDatabases('test');
  const { account, password } = req.body;
  try {
    const user = await admin.findOne({ account });

    if (user) {
      const isPasswordMatch = await compare(password, user.password);

      if (isPasswordMatch) {
        const payload = {
          id: user._id,
          name: user.name,
          role: user.role,
          campaign: user.campaign,
        };
        const jwtToken = await signJWT(payload);
        switchDatabases(user.name);

        res.cookie('adminToken', jwtToken, {
          maxAge: 3600000,
          httpOnly: true,
          path: '/',
        });
        return res.render('admin/homepage');
      }
      return res.status(403).send('Wrong Info');
    }
    return res.status(400).send('User not found');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
}

export function getSetup(req, res) {
  res.render('admin/setup');
}

export function getAuth() {}

export function postAuth() {}
