import setup from '../../../models/setupSchema.js';
import user from '../../../models/userSchema.js';

export function fetchProfile(req, res) {
  const profile = req.user;
  res.json(profile);
}

export function fetchCard(req, res) {
  const arr = [
    'https://d3nexs9enmvorf.cloudfront.net/0c4a1e9f-9757-454b-b9a0-41990aa8d845.webp',
    'https://d3nexs9enmvorf.cloudfront.net/2327d52d-68f0-4a71-bb8d-5e24c888bfa5.webp',
  ];

  res.json(arr);
}

export async function fetchCredits(req, res) {
  const sub = req.user.id;
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
  const sub = req.user.id;
  try {
    const userData = await user.findOne({ sub }, { history: { $slice: -3 } });
    res.json(userData.history);
  } catch (err) {
    console.error(err);
  }
}
export async function fetchStoreInfo(req, res) {
  const setupData = await setup.findOne().sort({ update_time: -1 });
  res.json(setupData);
}
