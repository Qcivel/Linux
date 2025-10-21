import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const GREETING = process.env.GREETING || 'Bonjour, Docker (JS) !';

app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', (_req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Exo Docker — Débutant (JS)</title>
    <link rel="stylesheet" href="/static/style.css" />
  </head>
  <body>
    <main class="container">
      <h1>${GREETING}</h1>
      <p>Votre mission : <strong>Dockeriser</strong> cette application Node.js/Express.</p>
      <ul>
        <li>Écrivez un <code>Dockerfile</code>.</li>
        <li>Construisez une image.</li>
        <li>Lancez un conteneur et ouvrez <code>http://localhost:${PORT}</code>.</li>
      </ul>
      <p class="hint">Astuce : voyez le fichier <code>README.md</code> pour des indices.</p>
    </main>
  </body>
</html>`);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
