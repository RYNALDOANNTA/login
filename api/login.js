// api/login.js
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ ok: false, error: "MISSING_CREDENTIALS" });
  }

  // USER dari ENV
  const users = [
    {
      username: process.env.USER1_USERNAME,
      hash: process.env.USER1_HASH,
    },
    {
      username: process.env.USER2_USERNAME,
      hash: process.env.USER2_HASH,
    },
  ];

  // Cek username cocok
  const user = users.find(
    (u) =>
      u.username &&
      u.hash &&
      u.username.toLowerCase() === username.trim().toLowerCase()
  );

  if (!user) {
    return res.status(401).json({ ok: false, error: "INVALID_CREDENTIALS" });
  }

  // Bandingkan password plaintext dengan hash di ENV
  const isValid = await bcrypt.compare(password, user.hash);

  if (!isValid) {
    return res.status(401).json({ ok: false, error: "INVALID_CREDENTIALS" });
  }

  // Berhasil
  return res.status(200).json({ ok: true });
}
