// api/login.js
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  console.log("Login API hit. Method:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
  }

  const body = req.body;
  console.log("Request body:", body);

  const { username, password } = body || {};

  if (!username || !password) {
    console.log("Missing credentials:", { username, password });
    return res.status(400).json({
      ok: false,
      error: "MISSING_CREDENTIALS",
      debug: {
        hasBody: !!body,
        username,
        passwordExists: !!password,
      },
    });
  }

  // Ambil user & hash dari ENV
  const users = [
    {
      username: process.env.USER1_USERNAME,
      hash: process.env.USER1_HASH,
      id: "USER1",
    },
    {
      username: process.env.USER2_USERNAME,
      hash: process.env.USER2_HASH,
      id: "USER2",
    },
  ];

  const envDebug = users.map((u) => ({
    id: u.id,
    username: u.username,
    hasHash: !!u.hash,
  }));

  console.log("Users from ENV:", envDebug);

  // Cari username
  const user = users.find(
    (u) =>
      u.username &&
      u.hash &&
      u.username.toLowerCase() === username.trim().toLowerCase()
  );

  if (!user) {
    console.log("User not found or ENV not set for username:", username);
    return res.status(401).json({
      ok: false,
      error: "USER_NOT_FOUND",
      debug: envDebug,
    });
  }

  // Cek password vs hash
  const isValid = await bcrypt.compare(password, user.hash);

  console.log("Password check:", { username: user.username, isValid });

  if (!isValid) {
    return res.status(401).json({
      ok: false,
      error: "BAD_PASSWORD",
    });
  }

  console.log("Login SUCCESS for:", user.username);

  return res.status(200).json({ ok: true });
}
