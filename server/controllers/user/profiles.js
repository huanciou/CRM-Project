import axios from 'axios';
import path from 'path';
import signJWT from '../../utils/signJWT.js';
import getModels from '../../models/modelHelper.js';

const { LOCATION_ORIGIN } = process.env;

export function getSignIn(req, res) {
  console.log('test');
  const { dbToken } = req.params;
  let lineLoginUrl = 'https://access.line.me/oauth2/v2.1/authorize?';
  lineLoginUrl += 'response_type=code&';
  lineLoginUrl += 'client_id=2001826171&';
  lineLoginUrl += `redirect_uri=${LOCATION_ORIGIN}/user/signInCallback&`;
  lineLoginUrl += 'state=123456789&'; // 防跨站請求
  lineLoginUrl += 'scope=profile%20openid%20email&';
  lineLoginUrl += 'ui_locales=zh-TW&';
  lineLoginUrl += 'bot_prompt=normal';

  res.cookie('dbToken', dbToken, { maxAge: 3600000, path: '/' });
  res.redirect(lineLoginUrl);
}

export function getCallback(req, res) {
  res.render('user/signInCallback');
}

export async function loginAuth(req, res) {
  const { access_token, id_token } = req.body;
  const verify = 'https://api.line.me/oauth2/v2.1/verify';
  const { dbToken } = req;
  const { user } = await getModels(dbToken);

  async function checkUserProfile(profile) {
    const { sub } = profile;
    const userProfile = await user.findOneAndUpdate(
      { sub },
      { $setOnInsert: profile },
      { upsert: true, new: true },
    );
    if (userProfile) {
      const payload = {
        id: userProfile.sub,
        name: userProfile.name,
        picture: userProfile.picture,
        history: userProfile.history,
        email: userProfile.email,
        related: userProfile.related,
      };
      const jwtToken = await signJWT(payload);
      return jwtToken;
    }
    return null;
  }

  async function getUserInfo(id_token, client_id) {
    const params = new URLSearchParams({ id_token, client_id });
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    return axios.post(verify, params, config).then((response) => {
      const profile = {
        ...response.data,
        provider: 'Line',
      };
      return checkUserProfile(profile);
    });
  }

  axios
    .get(verify, {
      params: {
        access_token,
      },
    })
    .then((respond) => getUserInfo(id_token, respond.data.client_id))
    .then((jwtToken) => {
      res.json(jwtToken);
    });
}

export function getReactRoute(req, res) {
  const build = path.resolve('public', 'build');
  res.sendFile(path.join(build, 'index.html'));
}

export function getReactRouteViaTest(req, res) {
  if (req.cookies.dbToken !== 'test') {
    res.cookie('dbToken', 'test', {
      maxAge: 3600000,
      path: '/',
    });
  }

  const build = path.resolve('public', 'build');
  res.sendFile(path.join(build, 'index.html'));
}
