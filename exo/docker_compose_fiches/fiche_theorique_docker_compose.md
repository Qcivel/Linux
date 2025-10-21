# 🧭 FICHE THÉORIQUE — Docker Compose

## 1. Qu’est-ce que Docker Compose ?
Docker Compose permet de **décrire et lancer plusieurs conteneurs** en une seule commande, grâce à un **fichier unique : `docker-compose.yml`**.

On y définit :
- les **services** (web, base de données, cache, etc.) ;
- leurs **liens et dépendances** ;
- les **ports exposés** ;
- les **volumes** pour persister les données ;
- les **variables d’environnement**.

---

## 2. Structure d’un fichier `docker-compose.yml`
Exemple minimal :
```yaml
version: "3.9"

services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - GREETING=Bonjour Docker Compose 👋
    restart: unless-stopped
```

### Signification :
| Élément | Rôle |
|----------|------|
| `version` | (Optionnel depuis Compose v2) version du format |
| `services` | Liste des conteneurs à lancer |
| `build` | Construit une image à partir du `Dockerfile` |
| `image` | Utilise une image existante sur Docker Hub |
| `ports` | Mappe le port hôte au port du conteneur (`"hôte:conteneur"`) |
| `environment` | Variables d’environnement passées au conteneur |
| `env_file` | Charge les variables depuis un fichier `.env` |
| `depends_on` | Définit l’ordre de démarrage entre services |
| `volumes` | Persiste des données sur le disque |
| `restart` | Politique de redémarrage automatique |

---

## 3. Volumes
Les **volumes** gardent les données même après la suppression des conteneurs.

```yaml
services:
  db:
    image: postgres:16-alpine
    volumes:
      - pg-data:/var/lib/postgresql/data

volumes:
  pg-data:
```
➡️ Le volume nommé `pg-data` stocke les données PostgreSQL.

---

## 4. Communication entre services
Compose crée automatiquement un **réseau interne**.  
Les services se contactent **par leur nom**.

Exemple :
```yaml
services:
  web:
    build: .
    environment:
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
```
→ Dans le code Node.js, `redis://redis:6379` fonctionne car `redis` est le nom du service.

---

## 5. Fichier `.env`
Un fichier `.env` à la racine peut stocker les variables d’environnement :
```env
POSTGRES_USER=compose_user
POSTGRES_PASSWORD=compose_pass
POSTGRES_DB=compose_db
```
On les charge ensuite dans le service :
```yaml
env_file: .env
```

---

## 6. Commandes essentielles

| Commande | Description |
|-----------|-------------|
| `docker compose up` | Lance les services |
| `docker compose up -d` | Lance en arrière-plan |
| `docker compose down` | Stoppe et nettoie les conteneurs |
| `docker compose ps` | Liste les services actifs |
| `docker compose logs -f` | Affiche les logs |
| `docker compose build` | Reconstruit les images |
| `docker compose exec <service> <cmd>` | Exécute une commande dans un conteneur |

---

## 7. Bonnes pratiques
- Le fichier doit s’appeler **`docker-compose.yml`**.  
- Versionner ce fichier, mais **pas** le `.env`.  
- Utiliser `restart: unless-stopped` pour la tolérance aux pannes.  
- Préférer les **volumes nommés** aux montages directs.  
- Utiliser `depends_on` pour gérer l’ordre de démarrage.  
- Documenter les ports utilisés et leur correspondance hôte ↔ conteneur.

---

## 8. Liens utiles
- Vue d’ensemble : https://docs.docker.com/compose/  
- Référence du fichier : https://docs.docker.com/compose/compose-file/  
- Variables et `.env` : https://docs.docker.com/compose/environment-variables/  
- Volumes : https://docs.docker.com/compose/compose-file/06-volumes/  
- Services et dépendances : https://docs.docker.com/compose/compose-file/05-services/
