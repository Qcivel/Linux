# 💪 FICHE 2 — PRATIQUE
## 🧩 Exercices progressifs pour apprendre à construire un Dockerfile

---

### 🧱 EXERCICE 1 — Lire et commenter un Dockerfile

#### 🎯 Objectif :
Découvrir la syntaxe d’un Dockerfile et comprendre chaque instruction en l’expliquant **directement dans le fichier**.

**Structure du projet :**
```
ex1-hello/
├── app.js
└── Dockerfile
```

**app.js**
```js
// Ce programme affiche un message à la console.
console.log("Hello Docker !");
```

**Dockerfile**
```Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
CMD ["node", "app.js"]
```

#### Tâches :
1. Ouvre le Dockerfile.  
2. Ajoute un **commentaire** au-dessus de chaque instruction pour expliquer son rôle.  
   > Exemple de syntaxe :  
   > `# Ceci est un commentaire`  
3. Exemple de début :
   ```Dockerfile
   # Choisir une image de base avec Node.js
   FROM node:20-alpine
   ```
4. Construis et exécute ensuite :
   ```bash
   docker build -t ex1-hello .
   docker run ex1-hello
   ```

---

### 📄 EXERCICE 2 — Compléter un Dockerfile simple

#### 🎯 Objectif :
Faire fonctionner un petit programme JavaScript qui lit un fichier texte.

**Structure du projet :**
```
ex2-fichier/
├── app.js
├── message.txt
└── Dockerfile
```

**app.js**
```js
// Ce programme lit le fichier message.txt et affiche son contenu.
import fs from "fs";

const message = fs.readFileSync("message.txt", "utf8");
console.log("Le message est :", message);
```

**message.txt**
```
Bonjour depuis un fichier !
```

**Dockerfile**
```Dockerfile
FROM node:20-alpine
WORKDIR /app

# À compléter :
# - Copie les fichiers du dossier courant vers /app
# - Indique la commande à exécuter pour lancer app.js
```

#### Tâches :
1. Observe le code JavaScript : quels fichiers doivent être disponibles dans le conteneur ?  
2. Complète le Dockerfile avec les instructions nécessaires.  
3. Construis et exécute ton image :
   ```bash
   docker build -t ex2-fichier .
   docker run ex2-fichier
   ```
4. Vérifie le message affiché.

---

### 🌐 EXERCICE 3 — Installer une dépendance Node.js

#### 🎯 Objectif :
Apprendre à **installer automatiquement une dépendance** (`express`) dans le conteneur et exécuter l’application.

**Structure du projet :**
```
ex3-installation/
├── package.json
├── app.js
└── Dockerfile
```

**package.json**
```json
{
  "name": "ex3-installation",
  "type": "module",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

**app.js**
```js
// Ce programme utilise la dépendance "express" pour afficher un message.
import express from "express";
const app = express();

app.get("/", (req, res) => res.send("Express a bien été installé !"));

app.listen(3000, () => console.log("Serveur prêt sur le port 3000"));
```

**Dockerfile**
```Dockerfile
FROM node:20-alpine
WORKDIR /app

# Étapes à compléter :
# - Copier le fichier package.json dans le conteneur
# - Installer les dépendances avec npm (commande à utiliser : npm install)
# - Copier le reste du code
# - Exposer le port utilisé par le serveur (3000)

CMD ["node", "app.js"]
```

#### Tâches :
1. Observe le fichier `package.json` : quelle dépendance faut-il installer ?  
2. Complète le Dockerfile pour installer et exécuter correctement l’application.  
3. Construis ton image :
   ```bash
   docker build -t ex3-installation .
   ```
4. Lance le conteneur :
   ```bash
   docker run -p 3000:3000 ex3-installation
   ```
5. Ouvre [http://localhost:3000](http://localhost:3000) et vérifie la réponse.

---

### ⚙️ EXERCICE 4 — Construire un Dockerfile complet

#### 🎯 Objectif :
Créer un Dockerfile complet pour un projet Node.js avec Express.

**Structure du projet :**
```
ex4-express/
├── server.js
├── package.json
└── Dockerfile
```

**server.js**
```js
// Ce serveur Express répond "Hello depuis Express et Docker !" à la racine "/"
import express from "express";
const app = express();

app.get("/", (req, res) => res.send("Hello depuis Express et Docker !"));
app.listen(3000, () => console.log("Serveur Express prêt sur le port 3000"));
```

**package.json**
```json
{
  "name": "express-example",
  "type": "module",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

**Dockerfile**
```Dockerfile
# Rédige ton propre Dockerfile complet :
# - Choisis une image de base adaptée
# - Crée le dossier de travail
# - Copie le fichier package.json
# - Installe les dépendances avec npm
# - Copie le reste du code
# - Expose le port 3000
# - Démarre le serveur
```

#### Tâches :
1. Observe le code et déduis les étapes nécessaires.  
2. Écris ton Dockerfile complet.  
3. Teste ton image :
   ```bash
   docker build -t ex4-express .
   docker run -p 3000:3000 ex4-express
   ```
4. Vérifie le bon fonctionnement dans le navigateur.

---

## 🎓 Récapitulatif de progression

| Exercice | Objectif principal | Notion clé |
|-----------|--------------------|-------------|
| 1 | Lire et commenter | Syntaxe et compréhension |
| 2 | Compléter un Dockerfile | COPY / CMD |
| 3 | Installer une dépendance et exécuter | npm install / EXPOSE / CMD |
| 4 | Construire entièrement | Structure complète d’un projet Node.js |
