import express from "express";
import Redis from "ioredis";

const app = express();
const PORT = process.env.PORT || 8000;
const GREETING = process.env.GREETING || "Compose + Redis";
const REDIS_URL = process.env.REDIS_URL || "redis://redis:6379";

const redis = new Redis(REDIS_URL);

app.get("/", async (_req, res) => {
  const count = await redis.incr("visits");
  res.send(`
    <h1>${GREETING}</h1>
    <p>Nombre de visites enregistrées : ${count}</p>
  `);
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Listening on http://localhost:${PORT}`)
);