// Password-check endpoint — validates against the AUTH_PASSWORD env var (server-side only).
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password } = req.body || {};
  const validPassword = process.env.AUTH_PASSWORD;

  if (!validPassword) return res.status(500).json({ error: 'Auth not configured on server' });
  if (password && password === validPassword) return res.status(200).json({ ok: true });
  return res.status(401).json({ error: 'Incorrect password' });
}
