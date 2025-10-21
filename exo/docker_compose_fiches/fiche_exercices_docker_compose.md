# 🧩 FICHE D’EXERCICES — Docker Compose (JS / Express)
> Vous n’écrivez **que** `docker-compose.yml`. Tous les autres fichiers sont fournis ci-dessous (copiez-les tels quels dans vos dossiers d’exercices).

---

## EXERCICE 1 — Lancer une app Express (guidé)
### Objectif
Créer un `docker-compose.yml` pour exécuter une application Express avec une variable d’environnement d’accueil.

### Arbo attendue
```
/exo1
 ├─ Dockerfile
 ├─ package.json
 ├─ server.js
 └─ docker-compose.yml    # ← à créer par vous
```

### Fichiers fournis

**Dockerfile**
```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 8000
CMD ["npm", "start"]
```

**package.json**
```json
{
  "name": "exo1-web",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": { "start": "node server.js" },
  "dependencies": { "express": "^4.19.2" }
}
```

**server.js**
```js
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
```

### À faire (contraintes)
- Définir un **service `web`** qui build le Dockerfile local.
- Publier le **port 8000** côté hôte.
- Fournir une variable d’environnement `GREETING`.
- Ajouter une politique de redémarrage adaptée.

### Test
- `docker compose up` puis ouvrir http://localhost:8000
- Le message affiché doit venir de `GREETING`.

---

## EXERCICE 2 — Connecter Express à Redis (guidage réduit)
### Objectif
Faire communiquer deux services : Express et Redis, avec persistance des données.

### Arbo attendue
```
/exo2
 ├─ Dockerfile
 ├─ package.json
 ├─ server.js
 └─ docker-compose.yml    # ← à créer par vous
```

### Fichiers fournis

**Dockerfile** (identique à l’exo 1)
```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 8000
CMD ["npm", "start"]
```

**package.json**
```json
{
  "name": "exo2-redis",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": { "start": "node server.js" },
  "dependencies": {
    "express": "^4.19.2",
    "ioredis": "^5.4.1"
  }
}
```

**server.js**
```js
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
```

### À faire (contraintes)
- Créer **2 services** : `web` (build local) et `redis` (image officielle `redis:7-alpine`).
- Injecter `REDIS_URL` côté `web` en pointant vers **le nom du service Redis**.
- Ajouter un **volume nommé** pour persister les données Redis.
- Définir la **dépendance de démarrage** (web après redis).
- Publier le port applicatif du web.

### Test
- `docker compose up -d`
- Ouvrir http://localhost:8000 → le compteur augmente à chaque refresh.
- `docker compose down` puis `up -d` → la valeur est conservée (persistance OK).

---

## EXERCICE 3 — Express + Postgres + Adminer (autonomie)
### Objectif
Orchestrer une app Express connectée à Postgres et à une UI SQL (Adminer).

### Arbo attendue
```
/exo3
 ├─ Dockerfile
 ├─ package.json
 ├─ server.js
 ├─ db/init.sql
 ├─ .env
 └─ docker-compose.yml    # ← à créer par vous
```

### Fichiers fournis

**Dockerfile** (identique aux exos 1–2)
```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 8000
CMD ["npm", "start"]
```

**package.json**
```json
{
  "name": "exo3-postgres",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": { "start": "node server.js" },
  "dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "pg": "^8.11.0"
  }
}
```

**server.js**
```js
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
```

**db/init.sql**
```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
INSERT INTO users(name) VALUES ('Alice'), ('Bob');
```

**.env**
```env
POSTGRES_USER=compose_user
POSTGRES_PASSWORD=compose_pass
POSTGRES_DB=compose_db
DATABASE_URL=postgres://compose_user:compose_pass@db:5432/compose_db
```

### À faire (contraintes)
Créer un `docker-compose.yml` complet avec **3 services** :

1) **db (Postgres)**  
- Image `postgres:16-alpine`.  
- Charger les variables d’environnement depuis `.env`.  
- **Persister** les données avec un **volume nommé**.  
- **Monter le script `db/init.sql` en lecture seule** dans `/docker-entrypoint-initdb.d/` pour qu’il s’exécute **automatiquement à la première initialisation** de la base.  
- Politique `restart` adaptée.

2) **web (Express)**  
- Build local.  
- Publier le port 8000.  
- Charger `.env` pour la chaîne `DATABASE_URL`.  
- Dépendre de `db`.  
- Politique `restart` adaptée.

3) **adminer**  
- Image officielle `adminer:latest`.  
- Publier un port d’UI (ex. 8080).  
- Dépendre de `db`.

**Déclarer le volume nommé** pour la base (ex. `pg-data:`).

### Test
1. `docker compose up -d`
2. http://localhost:8000 → affiche le nombre d’utilisateurs (`Alice`, `Bob`).
3. `curl -X POST "http://localhost:8000/api/users?name=Toto"` → ajoute un utilisateur.
4. Adminer : http://localhost:8080  
   - Serveur : `db`  
   - Utilisateur : `compose_user`  
   - Mot de passe : `compose_pass`  
   - Base : `compose_db`
5. `docker compose down && docker compose up -d` → les données persistent grâce au volume.

---

## 📚 Liens de documentation officielle
- Vue d’ensemble Compose : https://docs.docker.com/compose/  
- Référence du fichier : https://docs.docker.com/compose/compose-file/  
- Variables et `.env` : https://docs.docker.com/compose/environment-variables/  
- Volumes : https://docs.docker.com/compose/compose-file/06-volumes/  
- Services & dépendances : https://docs.docker.com/compose/compose-file/05-services/
