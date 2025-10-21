# 📖 Fiche théorique – Commandes Docker utiles

## Gestion des images
- `docker pull <image>` : télécharger une image
- `docker images` : lister les images locales
- `docker rmi <image>` : supprimer une image
- `docker build -t <nom> .` : construire une image depuis un Dockerfile

## Gestion des conteneurs
- `docker run <image>` : lancer un conteneur
- `docker run -d -p <hôte>:<conteneur> <image>` : lancer en arrière-plan et mapper les ports
- `docker ps` : lister les conteneurs actifs
- `docker ps -a` : lister tous les conteneurs (y compris stoppés)
- `docker stop <id>` : arrêter un conteneur
- `docker rm <id>` : supprimer un conteneur
- `docker logs <id>` : afficher les logs
- `docker exec -it <id> <commande>` : exécuter une commande dans un conteneur

## Volumes et persistance
- `docker volume create <nom>` : créer un volume
- `docker volume ls` : lister les volumes
- `docker run -v <volume>:<chemin>` : monter un volume dans un conteneur

## Réseaux
- `docker network create <nom>` : créer un réseau
- `docker network ls` : lister les réseaux
- `docker run --network <nom>` : connecter un conteneur à un réseau
- `docker network inspect <nom>` : détails d’un réseau

## Docker Compose
- `docker compose up -d` : démarrer les services en arrière-plan
- `docker compose down` : arrêter et supprimer les services
- `docker compose ps` : voir l’état des services
- `docker compose logs <service>` : afficher les logs d’un service
- `docker compose exec <service> <commande>` : exécuter une commande dans un service
