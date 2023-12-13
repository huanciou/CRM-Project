import getModels from '../../../models/modelHelper.js';

export function fetchProfile(req, res) {
  const profile = req.user;
  res.json(profile);
}

export async function fetchCard(req, res) {
  const { dbToken } = req;
  const { admin } = await getModels(dbToken);
  // const { related } = req.user;
  const { LOCATION_ORIGIN } = process.env;

  // const img = await admin.find({ name: { $in: related } });
  const img = await admin.find();
  const cards = img.map((i) => ({
    img: i.campaign,
    url: `${LOCATION_ORIGIN}/user/signIn/${i.name}`,
  }));

  res.json(cards);
}

export async function fetchCredits(req, res) {
  const sub = req.user.id;
  const { dbToken } = req;
  const { user } = await getModels(dbToken);

  try {
    const userData = await user.findOne({
      sub,
    });
    res.json(userData.credits);
  } catch (err) {
    console.error(err);
  }
}

export async function fetchHistory(req, res) {
  const { dbToken } = req;
  const { history } = req.body; // 拿到一個 array
  const { user } = await getModels(dbToken);
  const userData = {
    checkout_Time,
  };

  try {
    const resData = await user.findOne({ sub }, { history: { $slice: -3 } });
  } catch (err) {
    console.error(err);
  }

  res.json();
}
export async function fetchStoreInfo(req, res) {
  const { dbToken } = req;
  const { setup } = await getModels(dbToken);
  const setupData = await setup.findOne().sort({ update_time: -1 });
  res.json(setupData);
}
