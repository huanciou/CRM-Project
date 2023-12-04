import axios from 'axios';
import path from 'path';
import user from '../../models/userSchema.js';
import signJWT from '../../utils/signJWT.js';

export function getSignIn(req, res) {
  res.render('user/signIn');
}

export function getCallback(req, res) {
  res.render('user/signInCallback');
}

export async function loginAuth(req, res) {
  const { access_token, id_token } = req.body;
  const verify = 'https://api.line.me/oauth2/v2.1/verify';

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

export function getCredit(req, res) {
  res.send('1');
}

export function getCoupon(req, res) {
  res.send('2');
}

export function getVip(req, res) {
  res.send('4');
}

export function getInfo(req, res) {
  res.send('3');
}

export function getCard(req, res) {
  res.send('5');
}

export function getProfile(req, res) {
  res.send('hi');
}
