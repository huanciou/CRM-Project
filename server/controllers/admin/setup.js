import path from 'path';
import getModels from '../../models/modelHelper.js';
import { compare } from '../../utils/encrypt.js';
import signJWT from '../../utils/signJWT.js';

export function getLogin(req, res) {
  if (req.cookies.adminToken) {
    return res.redirect('/admin/menuSetup');
  }
  res.cookie('dbToken', 'test', {
    maxAge: 3600000,
    path: '/',
  });
  const build = path.resolve('public', 'build');
  res.sendFile(path.join(build, 'index.html'));
}

export async function postLogin(req, res) {
  const { account, password } = req.body;
  try {
    const { admin } = await getModels('test');
    const user = await admin.findOne({ account });
    if (user) {
      const isPasswordMatch = await compare(password, user.password);
      console.log(`match?: ${isPasswordMatch}`);
      if (isPasswordMatch) {
        const payload = {
          id: user._id,
          name: user.name,
          role: user.role,
          campaign: user.campaign,
        };
        const jwtToken = await signJWT(payload);

        res.cookie('adminToken', jwtToken, {
          maxAge: 3600000,
          httpOnly: true, // 這裡要改
          path: '/',
        });

        res.cookie('dbToken', user.name, {
          maxAge: 3600000,
          path: '/',
        });
        return res.status(200).send('ok');
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

export function getHomepage(req, res) {
  const build = path.resolve('public', 'build');
  res.sendFile(path.join(build, 'index.html'));
}
