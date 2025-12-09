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

  const users = [
    { username: process.env.USER1_USERNAME, hash: process.env.USER1_HASH },
    { username: process.env.USER2_USERNAME, hash: process.env.USER2_HASH },
    { username: process.env.USER3_USERNAME, hash: process.env.USER3_HASH },
    { username: process.env.USER4_USERNAME, hash: process.env.USER4_HASH },
    { username: process.env.USER5_USERNAME, hash: process.env.USER5_HASH },
  ];

  const user = users.find(
    (u) =>
      u.username &&
      u.hash &&
      u.username.toLowerCase() === username.trim().toLowerCase()
  );

  if (!user) {
    return res.status(401).json({ ok: false, error: "INVALID_CREDENTIALS" });
  }

  const isValid = await bcrypt.compare(password, user.hash);

  if (!isValid) {
    return res.status(401).json({ ok: false, error: "INVALID_CREDENTIALS" });
  }

  return res.status(200).json({ ok: true });
}
