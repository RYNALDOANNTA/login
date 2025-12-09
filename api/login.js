// api/login.js
import bcrypt from "bcryptjs";

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
  }

  const { username, password, cfToken } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ ok: false, error: "MISSING_CREDENTIALS" });
  }

  if (!cfToken) {
    return res.status(400).json({ ok: false, error: "MISSING_CF_TOKEN" });
  }
  if (!TURNSTILE_SECRET_KEY) {
    console.error("TURNSTILE_SECRET_KEY is not set in environment variables");
    return res.status(500).json({ ok: false, error: "SERVER_MISCONFIGURED" });
  }
  try {
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(
          TURNSTILE_SECRET_KEY
        )}&response=${encodeURIComponent(cfToken)}`,
      }
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      console.warn("Turnstile verification failed:", verifyData);
      return res
        .status(401)
        .json({ ok: false, error: "CLOUDFLARE_VERIFICATION_FAILED" });
    }
  } catch (err) {
    console.error("Error verifying Turnstile:", err);
    return res.status(500).json({ ok: false, error: "CF_VERIFY_ERROR" });
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
      u.username === username.trim()
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
