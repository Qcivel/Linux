# 🧩 FICHE D’EXERCICES — Linux & Docker : Fondamentaux + Automatisation

## 🎯 Objectif
Découvrir ou réviser les commandes Linux, les concepts essentiels de Docker, les scripts Bash et la planification de tâches avec cron à travers des exercices pratiques.

---

## 🧠 Partie 1 — Linux : Commandes de base

### 📂 Exercice 1 : Navigation et gestion des fichiers
**Objectif :** maîtriser la navigation dans le système de fichiers.

1. Affiche ton répertoire courant.  
2. Liste les fichiers et dossiers, y compris les fichiers cachés.  
3. Crée un dossier `formation_linux` puis navigue à l’intérieur.  
4. Crée trois fichiers : `notes.txt`, `todo.txt`, `config.cfg`.  
5. Copie `notes.txt` vers un dossier `sauvegarde`.  
6. Supprime `todo.txt`.  
7. Déplace `config.cfg` dans le dossier `sauvegarde`.  

---

### 🧩 Exercice 2 : Permissions et utilisateurs
1. Affiche les permissions de tes fichiers.  
2. Modifie les droits d’un fichier pour donner tous les droits au propriétaire.  
3. Change le propriétaire d’un fichier (si tu en as les droits).  

---

### 💻 Exercice 3 : Processus et système
1. Affiche la liste des processus en cours.  
2. Trouve le PID de ton terminal.  
3. Termine un processus donné.  
4. Observe la consommation CPU et mémoire en temps réel.  
5. Affiche la place disque et la mémoire disponible.  

---

### 🔍 Exercice 4 : Recherche et redirection
1. Recherche un mot particulier dans un fichier texte.  
2. Redirige la sortie d’une commande vers un fichier.  
3. Affiche seulement les 10 dernières lignes d’un fichier.  
4. Combine deux commandes avec un pipe (`|`) pour filtrer un résultat.  

---

## ⚙️ Partie 2 — Scripts Bash

### 🧾 Exercice 1 : Premier script
1. Crée un fichier `bonjour.sh`.  
2. Écris un script qui affiche “Bonjour, $(whoami) !”.  
3. Donne-lui les droits d’exécution.  
4. Exécute-le.  

---

### 🧮 Exercice 2 : Variables et conditions
1. Crée un script qui demande un nom d’utilisateur en argument et affiche “Bienvenue [nom]”.  
2. Ajoute une condition : si aucun argument n’est fourni, affiche un message d’erreur.  
3. Teste le script avec et sans argument.  

---

### 🔁 Exercice 3 : Boucles et fichiers
1. Écris un script qui affiche la liste de tous les fichiers d’un dossier, un par ligne.  
2. Ajoute une boucle pour afficher le nombre total de fichiers à la fin.  
3. Modifie le script pour écrire cette liste dans un fichier de log.  

---

### 🕒 Exercice 4 : Cron — automatisation
1. Ouvre le planificateur de tâches (`crontab -e`).  
2. Programme l’exécution d’un script chaque minute pour écrire la date dans un fichier `historique.txt`.  
3. Vérifie que la tâche s’exécute automatiquement.  
4. Modifie le cron pour qu’il s’exécute toutes les 5 minutes.  
5. Supprime la tâche planifiée.  

---

## 🐳 Partie 3 — Docker : Concepts et manipulations

### 📦 Exercice 1 : Découverte
1. Vérifie la version de Docker.  
2. Liste les conteneurs en cours d’exécution.  
3. Liste tous les conteneurs, y compris les arrêtés.  
4. Liste les images disponibles localement.  

---

### 🚀 Exercice 2 : Manipulation d’images et de conteneurs (avec Alpine)
1. Télécharge une image **Alpine**.  
2. Lance un conteneur interactif basé sur cette image.  
3. Depuis ce conteneur :  
   - Mets à jour les paquets.  
   - Installe un outil simple (ex : `curl` ou `nano`).  
   - Crée un fichier dans `/data` et sors sans supprimer le conteneur.  
4. Liste les conteneurs existants et relance celui que tu viens d’arrêter.  
5. Supprime le conteneur et l’image.  

---

### 🧱 Exercice 3 : Créer sa propre image
1. Crée un fichier `Dockerfile` basé sur **Alpine**.  
2. Ajoute une commande qui écrit un message dans un fichier `/hello.txt`.  
3. Spécifie une commande par défaut qui affiche le contenu de ce fichier.  
4. Construis l’image et exécute un conteneur pour vérifier son comportement.  

---

### 🌍 Exercice 4 : Réseau et volumes
1. Lance un conteneur **Nginx** en détaché, accessible sur le port `8080`.  
2. Vérifie depuis ton navigateur que le serveur répond.  
3. Crée un **volume Docker** nommé `data_test`.  
4. Monte ce volume dans un conteneur Alpine et ajoute un fichier dans `/data`.  
5. Relance un autre conteneur en utilisant le même volume pour vérifier la persistance.  

---

### 🧰 Exercice 5 : Docker Compose (description)
**Objectif :** comprendre l’orchestration multi-services.

1. Crée un fichier `docker-compose.yml` (tu écriras toi-même sa structure).  
2. Le service principal doit être un conteneur **Nginx** exposé sur le port `8080`.  
3. Ajoute un second service basé sur **Alpine** exécutant une commande simple (ex. `echo`).  
4. Lance l’ensemble des services avec Docker Compose.  
5. Vérifie que les conteneurs sont actifs, puis arrête et supprime tout.  

---

## ✅ Bilan des compétences
À la fin de cette fiche, tu devrais être capable de :
- Naviguer efficacement dans un système Linux et gérer les fichiers.  
- Créer, exécuter et planifier des **scripts Bash**.  
- Utiliser `cron` pour automatiser des tâches.  
- Manipuler Docker : images, conteneurs, volumes, et réseau.  
- Comprendre la logique d’un fichier `docker-compose.yml`.  
