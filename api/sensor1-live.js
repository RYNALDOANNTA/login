// api/sensor1-live.js
// Endpoint untuk baca data sensor1/live dari Firebase via Admin SDK
// dan mengirim ke frontend sebagai JSON sederhana.

const admin = require("firebase-admin");

// Inisialisasi Firebase Admin sekali saja (Vercel reuse instance)
if (!admin.apps.length) {
  const {
    FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_DB_URL,
  } = process.env;

  if (
    !FIREBASE_PROJECT_ID ||
    !FIREBASE_CLIENT_EMAIL ||
    !FIREBASE_PRIVATE_KEY ||
    !FIREBASE_DB_URL
  ) {
    console.error("❌ Firebase ENV tidak lengkap. Cek konfigurasi di Vercel.");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      // PRIVATE KEY di ENV berisi '\n' literal → ubah ke newline beneran
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    databaseURL: FIREBASE_DB_URL,
  });
}

const db = admin.database();

module.exports = async (req, res) => {
  // Hanya izinkan GET
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
  }

  try {
    // Baca node `sensor1/live` dari Realtime Database
    const snapshot = await db.ref("sensor1/live").get();
    const data = snapshot.val() || {};

    // Ambil nilai speed dan paksa jadi number
    let rawSpeed = 0;
    if (typeof data.speed === "number") {
      rawSpeed = data.speed;
    } else if (typeof data.speed === "string") {
      const parsed = Number(data.speed);
      rawSpeed = Number.isFinite(parsed) ? parsed : 0;
    }

    // Response ke frontend
    return res.status(200).json({
      ok: true,
      speed: rawSpeed,
      // kalau mau kirim timestamp atau field lain nanti bisa tambahkan:
      // ts: data.ts || null,
      // raw: data,
    });
  } catch (err) {
    console.error("❌ Error di /api/sensor1-live:", err);
    return res.status(500).json({
      ok: false,
      error: "FIREBASE_ERROR",
    });
  }
};
