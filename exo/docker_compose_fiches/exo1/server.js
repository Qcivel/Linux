import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;
const GREETING = process.env.GREETING || "Hello Docker Compose 👋";

app.get("/", (_req, res) => {
  res.send(`<h1>${GREETING}</h1><p>Express via Docker Compose</p>`);
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://localhost:${PORT}`)
);