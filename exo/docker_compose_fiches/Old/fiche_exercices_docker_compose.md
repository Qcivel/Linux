# 🧩 FICHE D’EXERCICES — Docker Compose (JS / Express)

## EXERCICE 1 — Lancer une app Express
### Objectif
Créer un `docker-compose.yml` pour exécuter une application Express.

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

### À faire
- Créer un **service `web`** qui :
  - build l’image locale via le `Dockerfile` ;
  - publie le port `8000` ;
  - fournit une variable d’environnement `GREETING` ;
  - redémarre automatiquement en cas d’arrêt.

### Test
- `docker compose up`
- Accéder à [http://localhost:8000](http://localhost:8000)
- Le message affiché doit venir de la variable `GREETING`.

---

## EXERCICE 2 — Connecter Express à Redis
### Objectif
Faire communiquer deux services : Express et Redis.

### Fichiers fournis
**server.js**
```js
import express from "express";
import Redis from "ioredis";

const app = express();
const PORT = process.env.PORT || 8000;
const REDIS_URL = process.env.REDIS_URL || "redis://redis:6379";

const redis = new Redis(REDIS_URL);

app.get("/", async (_req, res) => {
  const count = await redis.incr("visits");
  res.send(`<h1>Visites : ${count}</h1>`);
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Listening on http://localhost:${PORT}`)
);
```

### À faire
- Créer un `docker-compose.yml` avec **2 services** :
  1. `web` → construit localement, communique avec Redis via une variable d’environnement `REDIS_URL`.
  2. `redis` → utilise l’image officielle `redis:7-alpine`.  
- Définir une **dépendance de démarrage** entre les deux services (`depends_on`).
- Ajouter un **volume nommé** pour persister les données Redis.

### Test
- `docker compose up -d`
- Ouvrir [http://localhost:8000](http://localhost:8000)
- Actualiser plusieurs fois : le compteur augmente.
- Après `docker compose down` puis `up`, la valeur est conservée.

---

## EXERCICE 3 — Express + Postgres + Adminer
### Objectif
Orchestrer une app Express connectée à une base Postgres, et y accéder via une interface Adminer.

### Fichiers fournis
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

app.post("/api/users", async (req, res) => {
  const name = req.query.name || "Anonyme";
  await pool.query("INSERT INTO users(name) VALUES($1)", [name]);
  res.json({ ok: true });
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Listening on http://localhost:${PORT}`)
);
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

### À faire
Créer un `docker-compose.yml` complet avec **3 services** :

1. **db (Postgres)**  
   - Utiliser l’image officielle `postgres:16-alpine`.  
   - Charger les variables d’environnement depuis `.env`.  
   - Monter un **volume nommé** pour stocker les données PostgreSQL.  
   - Monter le **script `db/init.sql`** en lecture seule dans le dossier spécial  
     `/docker-entrypoint-initdb.d/` du conteneur pour qu’il soit exécuté automatiquement à la première initialisation.  
   - Définir une politique `restart: unless-stopped`.

2. **web (Express)**  
   - Construire depuis le `Dockerfile` local.  
   - Publier le port 8000 côté hôte.  
   - Charger les variables depuis `.env`.  
   - Dépendre du service `db` (`depends_on`).  
   - `restart: unless-stopped`.

3. **adminer**  
   - Utiliser l’image officielle `adminer:latest`.  
   - Publier un port (ex. `8080:8080`).  
   - Dépendre du service `db`.

Et enfin déclarer le volume :
```yaml
volumes:
  pg-data:
```

### Test
1. `docker compose up -d`
2. Ouvrir [http://localhost:8000](http://localhost:8000)  
   → affiche le nombre d’utilisateurs (`Alice`, `Bob`).
3. Ajouter un utilisateur :  
   ```bash
   curl -X POST "http://localhost:8000/api/users?name=Toto"
   ```
4. Vérifier dans Adminer :  
   - URL : [http://localhost:8080](http://localhost:8080)  
   - Serveur : `db`  
   - Utilisateur : `compose_user`  
   - Mot de passe : `compose_pass`  
   - Base : `compose_db`
5. Supprimer puis relancer (`docker compose down && docker compose up -d`)  
   → les données sont toujours présentes (grâce au volume nommé).
