// api/login.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ ok: false, error: "MISSING_CREDENTIALS" });
  }

  // Data user dari ENV (plaintext, sesuai permintaan)
  const users = [
    {
      username: process.env.USER1_USERNAME, // "raynaldo"
      password: process.env.USER1_PASSWORD, // "raynaldo 123"
    },
    {
      username: process.env.USER2_USERNAME, // "wijaya"
      password: process.env.USER2_PASSWORD, // "wijaya123"
    },
  ];

  // Cari user cocok username (case-insensitive)
  const user = users.find(
    (u) =>
      u.username &&
      u.password &&
      u.username.toLowerCase() === username.trim().toLowerCase()
  );

  if (!user) {
    return res.status(401).json({ ok: false, error: "INVALID_CREDENTIALS" });
  }

  // Bandingkan password langsung
  if (password !== user.password) {
    return res.status(401).json({ ok: false, error: "INVALID_CREDENTIALS" });
  }

  // Kalau sampai sini: username & password benar
  return res.status(200).json({ ok: true });
}
