import path from 'path';
import getModels from '../../models/modelHelper.js';
import { compare } from '../../utils/encrypt.js';
import signJWT from '../../utils/signJWT.js';
import { ValidationError } from '../../utils/errorHandler.js';

export function getLogin(req, res, next) {
  try {
    if (req.cookies.adminToken) {
      res.redirect('/admin/menuSetup');
      return;
    }
    res.cookie('dbToken', 'test', {
      maxAge: 3600000,
      path: '/',
    });
    const build = path.resolve('public', 'build');
    res.sendFile(path.join(build, 'index.html'));
  } catch (err) {
    next(err);
  }
}

export async function postLogin(req, res, next) {
  const { account, password } = req.body;
  try {
    const { admin } = await getModels('test');
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

        res.cookie('adminToken', jwtToken, {
          maxAge: 3600000,
          httpOnly: true, // 這裡要改
          path: '/',
        });

        res.cookie('dbToken', user.name, {
          maxAge: 3600000,
          path: '/',
        });
        res.status(200).send('ok');
        return;
      }
      throw new ValidationError('Wrong Login information');
    }
    throw new ValidationError('Wrong Login information');
  } catch (err) {
    next(err);
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
