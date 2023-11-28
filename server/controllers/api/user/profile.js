export function fetchProfile(req, res) {
  console.log(req.user);
  const profile = req.user;
  res.send('hi');
}

export function fetchInfo() {}

export function fetchCard() {}
