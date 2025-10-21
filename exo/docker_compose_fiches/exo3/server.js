import express from "express";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 8000;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get("/", async (_req, res) => {
  const { rows } = await pool.query("SELECT COUNT(*)::int AS n FROM users");
  res.send(`<h1>Utilisateurs : ${rows[0].n}</h1>`);
});

app.get("/api/users", async (_req, res) => {
  const { rows } = await pool.query("SELECT id, name FROM users ORDER BY id ASC");
  res.json(rows);
});

app.post("/api/users", async (req, res) => {
  const name = (req.query.name || "Anonyme").toString();
  await pool.query("INSERT INTO users(name) VALUES($1)", [name]);
  res.json({ ok: true });
});

app.listen(PORT, "0.0.0.0", () => console.log(`Listening on :${PORT}`));