export function fetchProfile(req, res) {
  console.log(req.user);
  const profile = req.user;
  res.json(profile);
}

export function fetchInfo() {}

export function fetchCard() {}
