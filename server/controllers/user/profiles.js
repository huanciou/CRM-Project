import axios from 'axios';
import user from '../../models/userSchema.js';

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
      console.log(userProfile);
    }
  }

  function getUserInfo(id_token, client_id) {
    const params = new URLSearchParams({ id_token, client_id });
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    axios.post(verify, params, config).then((response) => {
      const profile = {
        ...response.data,
        provider: 'Line',
      };
      checkUserProfile(profile);
    });
  }

  axios
    .get(verify, {
      params: {
        access_token,
      },
    })
    .then((respond) => {
      getUserInfo(id_token, respond.data.client_id);
    });

  res.send('ok');
}

export function getCredit(req, res) {
  res.send('1');
}

export function getCoupon(req, res) {
  res.send('2');
}

export function getInfo(req, res) {
  res.send('3');
}

export function getVip(req, res) {
  res.send('4');
}
