# Exercice Docker — Niveau Débutant (JavaScript) : Dockeriser une mini‑app Express

## Objectif
Dockeriser **vous-même** cette application Node.js/Express afin qu’elle tourne dans un conteneur. L’exercice vise à vous familiariser avec l’écriture d’un `Dockerfile` simple.

## Ce qui est fourni
- Une mini‑application **Express** (`server.js`) qui affiche un message.
- Un template HTML et un fichier CSS minimal.
- Un fichier `package.json` et un `package-lock.json` minimal (généré à l’installation).
- Un fichier d’exemple d’environnement `.env.example`.

> ⚠️ **Important** : Il **n’y a pas** de `Dockerfile` dans ce projet. C’est à vous de l’écrire.

---

## Lancer **en local** (sans Docker)
1. Assurez‑vous d’avoir **Node.js 18+** installé.
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. (Optionnel) Créez un fichier `.env` à partir de `.env.example` :
   ```bash
   cp .env.example .env
   # puis éditez GREETING=...
   ```
4. Lancez l’appli :
   ```bash
   npm start
   ```
5. Ouvrez votre navigateur sur http://localhost:8000

---

## Votre mission : créer un `Dockerfile`
Créez un fichier `Dockerfile` à la racine du projet pour builder puis exécuter l’app.

### Contraintes / critères d’acceptation
- L’image doit :
  - Utiliser une image de base Node slim (ex. `node:20-slim`).
  - Définir un **`WORKDIR`** et copier `package*.json` puis **installer** les dépendances.
  - Copier le reste du code.
  - **Exposer le port 8000**.
  - Démarrer l’appli avec `npm start`.
- Le conteneur doit :
  - Lire la variable d’environnement `GREETING` si elle est fournie (sinon, valeur par défaut).
  - Répondre sur `http://localhost:8000` quand on mappe le port.

### Indices (si besoin)
- Pensez aux instructions **`WORKDIR`**, **`COPY package*.json`**, **`RUN npm ci --only=production`** (ou `npm install`), **`COPY . .`**, **`EXPOSE 8000`**, **`CMD ["npm","start"]`**.
- Un `.dockerignore` (optionnel) peut contenir par exemple :
  ```
  node_modules/
  npm-debug.log*
  .env
  .DS_Store
  ```

### Exemple de commandes **après** avoir écrit votre `Dockerfile`
```bash
# Construire l'image
docker build -t exo-express:1 .

# Lancer le conteneur (avec une variable d’environnement optionnelle)
docker run --rm -p 8000:8000 -e GREETING="Salut Docker 👋" --name exo-debutant-js exo-express:1
```

Vous devriez voir l’app sur http://localhost:8000

---

## Dépannage
- **Port déjà utilisé ?** Choisissez un autre port hôte : `-p 8080:8000`.
- **Dépendances manquantes ?** Rebuild de l’image après modification : `docker build -t exo-express:1 .`.
- **Variables d’env** : utilisez `-e CLE=valeur` ou un fichier `.env` (selon votre approche).

Bon courage et amusez‑vous ! 🚀
