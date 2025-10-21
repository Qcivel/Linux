# Déroulé de formation : Structure de fichiers sous Linux
**Public cible** : Débutants en informatique

---

## Matinée : Cours théorique

### 1. Introduction à la structure de fichiers Linux
- **Objectif** : Comprendre l'organisation hiérarchique des fichiers sous Linux.
- **Contenu** :
  - Présentation de l'arborescence Linux : tout part de la racine `/`.
  - Comparaison avec Windows (pas de lettres de lecteurs, tout est dans `/`).
  - Importance de la cohérence et de la standardisation (norme FHS - Filesystem Hierarchy Standard).

### 2. Les répertoires système essentiels 
- **Objectif** : Découvrir les principaux répertoires et leur rôle.

| Répertoire | Description | Exemple d'utilisation |
| :-- | :-- | :-- |
| **/bin** | Commandes de base (binaires) essentielles pour tous les utilisateurs. | `ls`, `cp`, `mv` : commandes utilisées quotidiennement. |
| **/sbin** | Commandes système réservées à l'administrateur (root). | `fdisk`, `ifconfig` : outils pour gérer les disques et le réseau. |
| **/etc** | Fichiers de configuration du système et des applications. | `/etc/passwd` : informations sur les utilisateurs. |
| **/home** | Répertoires personnels des utilisateurs (ex: `/home/nathan`). | Stockage des documents, téléchargements, etc. |
| **/root** | Répertoire personnel de l'administrateur (root). | Fichiers et configurations spécifiques à l'administrateur. |
| **/var** | Fichiers variables comme les logs, les caches, et les données des services. | `/var/log/` : journaux (logs) du système. |
| **/tmp** | Fichiers temporaires. Le contenu est souvent supprimé au redémarrage. | Stockage temporaire de fichiers par des applications. |
| **/usr** | Programmes et bibliothèques pour les utilisateurs (non essentiels au démarrage). | `/usr/bin/` : commandes supplémentaires. |
| **/lib** | Bibliothèques partagées essentielles pour les commandes dans `/bin` et `/sbin`. | Fichiers `.so` utilisés par les programmes. |
| **/dev** | Fichiers représentant les périphériques (disques, clavier, etc.). | `/dev/sda` : premier disque dur. |
| **/mnt** | Point de montage pour les systèmes de fichiers temporaires (clés USB, disques externes). | `/mnt/usb` : montage d'une clé USB. |
| **/media** | Point de montage pour les périphériques amovibles (automatique). | `/media/cdrom` : montage d'un CD/DVD. |
| **/opt** | Logiciels supplémentaires installés manuellement. | `/opt/google/chrome` : installation personnalisée de Chrome. |
| **/boot** | Fichiers nécessaires au démarrage du système (noyau, GRUB). | `/boot/vmlinuz` : noyau Linux. |
| **/proc** | Système de fichiers virtuel contenant des informations sur les processus et le noyau. | `/proc/cpuinfo` : informations sur le processeur. |
| **/sys** | Informations sur les périphériques et les pilotes. | `/sys/class/net/` : informations sur les interfaces réseau. |

### 3. Points clés à retenir 
- **Objectif** : Résumer les bonnes pratiques et les répertoires critiques.
- **Contenu** :
  - `/` est la racine du système de fichiers.
  - `/home` est l'endroit où les utilisateurs stockent leurs fichiers.
  - `/etc` et `/var` sont cruciaux pour la configuration et le fonctionnement du système.
  - `/bin` et `/sbin` contiennent des commandes essentielles.
  - **Avertissement** : Ne pas modifier les répertoires système (`/bin`, `/sbin`, `/etc`, etc.) sans comprendre les conséquences.

### 4. Questions et discussion
- **Objectif** : Clarifier les points obscurs et échanger sur les cas d'usage.
- **Questions** :
  - Pourquoi `/home` est-il séparé des autres répertoires système ?
  - À quoi servent les répertoires `/proc` et `/sys` si ce ne sont pas de "vrais" répertoires ?
  - Quels répertoires sont critiques pour le démarrage du système ?

---

## Après-midi : Travaux pratiques 

### 1. Exploration de l'arborescence
- **Objectif** : Se familiariser avec la structure de fichiers.
- **Étapes** :
  1. Ouvrir un terminal.
  2. Utiliser `ls /` pour lister les répertoires à la racine.
  3. Explorer les répertoires `/bin`, `/etc`, `/home`, `/var/log` avec `ls`.
  4. Utiliser `pwd` pour vérifier le répertoire courant.

### 2. Manipulation des répertoires utilisateur
- **Objectif** : Comprendre l'organisation des répertoires utilisateur.
- **Étapes** :
  1. Aller dans `/home` et lister les répertoires utilisateurs.
  2. Créer un répertoire personnel de test (`mkdir ~/test`).
  3. Créer un fichier dans ce répertoire (`touch ~/test/fichier.txt`).
  4. Utiliser `cat` pour afficher le contenu d'un fichier de configuration dans `/etc` (ex: `/etc/passwd`).

### 3. Montage de périphériques 
- **Objectif** : Apprendre à monter et démonter des périphériques.
- **Étapes** :
  1. Insérer une clé USB.
  2. Identifier le périphérique avec `lsblk`.
  3. Créer un point de montage (`sudo mkdir /mnt/usb`).
  4. Monter la clé USB (`sudo mount /dev/sdb1 /mnt/usb`).
  5. Explorer le contenu (`ls /mnt/usb`).
  6. Démonter la clé USB (`sudo umount /mnt/usb`).

### 4. Exploration des répertoires système
- **Objectif** : Découvrir les informations système dans `/proc` et `/sys`.
- **Étapes** :
  1. Explorer `/proc/cpuinfo` pour voir les informations sur le processeur.
  2. Explorer `/sys/class/net/` pour voir les interfaces réseau.
  3. Utiliser `cat` pour afficher le contenu de ces fichiers.
  4. Discuter de l'utilité de ces répertoires virtuels.

### 5. Exercice final : Création d'une arborescence
- **Objectif** : Mettre en pratique les connaissances acquises.
- **Étapes** :
  1. Créer une arborescence de répertoires dans `/home/nom_utilisateur/test` :
     ```
     mkdir -p ~/test/{documents,images,scripts}
     ```
  2. Créer un fichier dans chaque sous-répertoire (`touch ~/test/documents/note.txt`).
  3. Utiliser `tree` (si installé) pour visualiser l'arborescence.
  4. Documenter les commandes utilisées dans un fichier `~/test/README.txt`.
