export function fetchProfile(req, res) {
  const profile = req.user;
  res.json(profile);
}

export function fetchInfo() {}

export function fetchCard(req, res) {
  const arr = [
    'https://d3nexs9enmvorf.cloudfront.net/0c4a1e9f-9757-454b-b9a0-41990aa8d845.webp',
    'https://d3nexs9enmvorf.cloudfront.net/2327d52d-68f0-4a71-bb8d-5e24c888bfa5.webp',
  ];

  res.json(arr);
}
