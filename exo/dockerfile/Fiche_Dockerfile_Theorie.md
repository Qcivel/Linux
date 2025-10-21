# 🧠 FICHE 1 — THÉORIE
## 💡 Comprendre le Dockerfile avec des exemples simples en JavaScript

---

## 🎯 Objectif de la fiche
Apprendre à :
- Comprendre **ce qu’est Docker** et **ce qu’est une image**.  
- Identifier le **rôle d’un Dockerfile**.  
- Connaître les **principales instructions** d’un Dockerfile.  
- Comprendre le **processus de création et d’exécution** d’un conteneur.  
- Lire et analyser un **exemple complet** avec un petit programme JavaScript.

---

## 🚢 1. Qu’est-ce que Docker ?

Docker est un outil qui permet d’exécuter des applications dans des **conteneurs**.  
Un conteneur est comme une **petite boîte isolée**, qui contient :
- ton code,  
- les bibliothèques nécessaires (Node.js, Express, etc.),  
- et les configurations nécessaires pour le faire tourner.  

> 💡 **Avantage :** ton application fonctionne **de la même manière** sur ton ordinateur, celui de ton collègue ou un serveur distant.

---

## 🧱 2. Image vs Conteneur

| Élément | Description | Exemple |
|----------|--------------|----------|
| **Image** | Le plan de construction de ton application, figé et réutilisable. | L’image “recette” de ton programme. |
| **Conteneur** | Une instance en fonctionnement de l’image. | Le “programme qui tourne”. |

### Exemple concret :
- L’image est comme **un moule à gâteau** 🍰  
- Le conteneur est **le gâteau** qu’on obtient en cuisant ce moule.

---

## 📜 3. Le rôle du Dockerfile

Le **Dockerfile** est un fichier texte où tu expliques **comment construire une image**.  
Chaque ligne est une **instruction** lue par Docker, dans l’ordre.

> 🧩 On peut le comparer à une **recette de cuisine** :  
> - chaque instruction ajoute un ingrédient ou fait une action,  
> - le résultat final est une image Docker prête à être utilisée.

---

## ⚙️ 4. Cycle de vie d’un projet Docker

1. ✏️ Tu écris un **Dockerfile**  
2. 🧱 Tu **construis l’image** avec :  
   ```bash
   docker build -t mon-image .
   ```
3. 🚀 Tu **exécutes un conteneur** basé sur cette image :  
   ```bash
   docker run mon-image
   ```
4. 🔁 Tu peux relancer ou partager ton image : elle fonctionne partout.

---

## 🧩 5. Structure d’un Dockerfile

| Étape | Description | Exemple |
|--------|--------------|----------|
| 1️⃣ `FROM` | Choisit une image de base existante (ici Node.js) | `FROM node:20-alpine` |
| 2️⃣ `WORKDIR` | Définit le dossier de travail dans le conteneur | `WORKDIR /app` |
| 3️⃣ `COPY` | Copie les fichiers du projet dans le conteneur | `COPY . .` |
| 4️⃣ `RUN` | Exécute une commande pendant la construction (ex : installer des dépendances) | `RUN npm install` |
| 5️⃣ `EXPOSE` | Indique un port utilisé par ton application | `EXPOSE 3000` |
| 6️⃣ `CMD` | Déclare la commande à exécuter quand le conteneur démarre | `CMD ["node", "app.js"]` |

> ⚠️ L’ordre est important : si une étape change, Docker doit reconstruire tout ce qui vient **après**.

---

## 🧰 6. Exemple complet expliqué

**Structure du projet :**
```
.
├── app.js
└── Dockerfile
```

**app.js**
```js
// Petit programme JavaScript qui affiche un message
console.log("Bonjour depuis Docker !");
```

**Dockerfile**
```Dockerfile
# 1. Utiliser une image de base avec Node.js
FROM node:20-alpine

# 2. Créer et utiliser un dossier /app dans le conteneur
WORKDIR /app

# 3. Copier le code du projet dans le dossier /app
COPY . .

# 4. Définir la commande exécutée au démarrage
CMD ["node", "app.js"]
```

---

## 🧮 7. Comprendre la commande `docker build`

Quand tu exécutes :
```bash
docker build -t bonjour-js .
```

- `build` → demande à Docker de **construire une image**  
- `-t bonjour-js` → donne un nom à l’image construite  
- `.` → indique le dossier où se trouve le Dockerfile  

Docker lit le Dockerfile **ligne par ligne**, crée des **couches** (layers) à chaque étape, et les assemble dans une image finale.

Chaque couche est **mise en cache** :  
si rien n’a changé, Docker ne la reconstruit pas, ce qui rend la création plus rapide.

---

## 🚀 8. Lancer le conteneur

Une fois ton image construite, tu peux la lancer avec :
```bash
docker run bonjour-js
```

Docker :
1. Crée un conteneur à partir de ton image.  
2. Exécute la commande définie dans `CMD`.  
3. Affiche le résultat dans la console.

🟢 Exemple de résultat :
```
Bonjour depuis Docker !
```

---

## 🧱 9. Bonnes pratiques de base

1. **Utiliser une image légère**  
   → `node:20-alpine` est plus rapide et plus compacte que `node:20`.  
2. **Limiter ce qu’on copie dans l’image**  
   → Crée un fichier `.dockerignore` pour exclure les dossiers inutiles (ex : `node_modules`, `.git`, `.env`).  
3. **Toujours fixer les versions**  
   → Exemple : `FROM node:20-alpine` plutôt que `FROM node:latest`.  
4. **Utiliser des commandes claires et séparées**  
   → Exemple : séparer `RUN npm install` et `CMD ["node", "app.js"]`.  
5. **Garder un Dockerfile lisible**  
   → Les commentaires `#` sont très utiles pour comprendre la logique.

---

## 🔍 10. Résumé visuel du cycle complet

```
Code source + Dockerfile
          │
          ▼
   docker build → Image Docker
          │
          ▼
   docker run → Conteneur
          │
          ▼
     Application qui tourne
```

---

## 🧭 11. En résumé

| Élément | Rôle |
|----------|------|
| **Dockerfile** | Le plan de construction de ton environnement |
| **Image** | Le résultat figé de ce plan |
| **Conteneur** | L’image en cours d’exécution |
| **Langage d’exemple** | JavaScript / Node.js |
| **Commande clé** | `docker build` puis `docker run` |

---

## 🧩 12. À retenir

> - Un **Dockerfile** décrit une image.  
> - Une **image** permet de créer un conteneur.  
> - Un **conteneur** fait tourner ton application.  
> - Tout ce que tu construis est **portable et reproductible**.  
