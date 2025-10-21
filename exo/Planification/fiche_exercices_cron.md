# 🧩 FICHE D’EXERCICES — Planification avec `cron`

> 📘 Toutes les notions nécessaires se trouvent dans la fiche de cours *Automatisation & Planification avec cron.*

---

## 🧭 Partie A — Premiers pas

1. Vérifie que le **service `cron`** fonctionne sur ton système.  
   (Commande disponible dans la fiche de cours.)

2. Liste les **tâches planifiées** de ton utilisateur actuel.

3. Crée un dossier de travail :
   ```bash
   mkdir -p ~/exercices_cron/logs
   cd ~/exercices_cron
   ```

4. Crée un script `bonjour.sh` :
   ```bash
   #!/bin/bash
   echo "Bonjour $(whoami) — $(date)" >> ~/exercices_cron/logs/bonjour.log
   ```
   Puis rends-le exécutable.

5. Planifie ce script pour qu’il s’exécute **toutes les 2 minutes**.

6. Après quelques minutes, vérifie que le fichier `bonjour.log` contient plusieurs lignes.

---

## ⚙️ Partie B — Redirections et erreurs

7. Crée un script `test_erreur.sh` contenant :
   ```bash
   #!/bin/bash
   echo "Début du test à $(date)"
   mauvaise_commande
   echo "Fin du test"
   ```

8. Planifie-le pour s’exécuter **toutes les 3 minutes**,  
   en redirigeant **sortie et erreurs** dans `logs/test_erreur.log`.

9. Observe le contenu du log :
   - Quelle ligne signale l’erreur ?  
   - Comment est-elle enregistrée ?

10. Trouve la commande pour **supprimer toutes les tâches planifiées**.

---

## 📂 Partie C — Sauvegarde automatique

11. Crée un script `sauvegarde.sh` qui :
   - copie le dossier `~/Documents` vers `~/sauvegardes/`,  
   - ajoute la date au nom de la sauvegarde,  
   - écrit un message dans `logs/sauvegarde.log`.

12. Planifie ce script pour s’exécuter **chaque jour à 22h30**.

13. Vérifie que le log et les copies s’accumulent au fil des jours.

---

## 🔎 Partie D — Nettoyage planifié

14. Crée un script `nettoyage.sh` qui supprime les fichiers de plus de 7 jours dans `~/sauvegardes/`  
   et écrit la date du nettoyage dans `logs/nettoyage.log`.

15. Planifie-le pour s’exécuter **chaque lundi à 3h du matin**.

16. Teste-le manuellement pour vérifier son bon fonctionnement.

---

## 📊 Partie E — Rapport système

17. Crée un script `rapport_systeme.sh` qui écrit dans `logs/rapport.log` :
   - la date et l’heure,  
   - la charge système (`uptime`),  
   - l’espace disque libre (`df -h /`),  
   - le nombre de processus en cours (`ps aux | wc -l`).

18. Planifie-le pour s’exécuter **toutes les 4 heures**.

19. Vérifie que les rapports s’ajoutent bien au fichier log.

---

## ⚡ Partie F — Maintenance quotidienne

20. Crée un script `maintenance.sh` qui exécute successivement :
   - `sauvegarde.sh`,  
   - `nettoyage.sh`,  
   - `rapport_systeme.sh`.

   Il doit :
   - enregistrer le début et la fin dans `logs/maintenance.log`,  
   - rediriger toutes les erreurs (`2>&1`).

21. Planifie ce script pour s’exécuter **chaque jour à 23h00**.

22. Le lendemain matin, consulte `logs/maintenance.log` pour vérifier que tout s’est déroulé correctement.

---

## 💡 Pour aller plus loin
- Planifie une tâche **toutes les 5 minutes uniquement du lundi au vendredi**.  
- Ajoute dans `rapport_systeme.sh` la **taille du dossier sauvegardé** (`du -sh`).  
- Crée une tâche qui **nettoie automatiquement les fichiers de log de plus de 15 jours**.
