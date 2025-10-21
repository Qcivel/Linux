# 🧩 FICHE D’EXERCICES — Gestion utilisateurs, permissions, scripts et planification

> 📘 Objectif : mettre en pratique l’ensemble des notions Linux vues jusqu’ici :  
> **utilisateurs, groupes, permissions, scripts et automatisation.**

> 💡 Vous devez **travailler en tant que super-utilisateur (`sudo`)** sur votre VM.

---

## 🧭 Partie A — Création d’utilisateurs et de groupes

1. Créez un **groupe `devs`** et un **groupe `managers`** :
   ```bash
   sudo groupadd devs
   sudo groupadd managers
   ```

2. Créez trois utilisateurs :
   ```bash
   sudo useradd -m -s /bin/bash alice
   sudo useradd -m -s /bin/bash bob
   sudo useradd -m -s /bin/bash claire
   ```

3. Associez :
   - `alice` et `bob` → groupe `devs`  
   - `claire` → groupe `managers`

   ```bash
   sudo usermod -aG devs alice
   sudo usermod -aG devs bob
   sudo usermod -aG managers claire
   ```

4. Vérifiez la composition des groupes :
   ```bash
   groups alice
   groups claire
   ```

5. Créez un dossier commun :
   ```bash
   sudo mkdir -p /srv/projets
   sudo chown root:devs /srv/projets
   sudo chmod 2775 /srv/projets
   ```
   > Le bit **2** (setgid) garantit que tous les fichiers créés appartiendront au groupe `devs`.

---

## 📁 Partie B — Gestion des permissions

6. Dans `/srv/projets`, créez :
   - un dossier `alpha` accessible uniquement au groupe `devs`,  
   - un dossier `docs_managers` accessible uniquement au groupe `managers`.

   ```bash
   sudo mkdir /srv/projets/alpha /srv/projets/docs_managers
   sudo chown :devs /srv/projets/alpha
   sudo chown :managers /srv/projets/docs_managers
   sudo chmod 2770 /srv/projets/alpha
   sudo chmod 2770 /srv/projets/docs_managers
   ```

7. Connectez-vous en tant qu’`alice` puis `claire` (ou utilisez `sudo -u`) pour tester :
   ```bash
   sudo -u alice touch /srv/projets/alpha/test.txt
   sudo -u claire touch /srv/projets/alpha/test2.txt
   ```
   → Quelle erreur se produit ? Pourquoi ?

8. Corrigez les permissions si besoin et notez vos observations.

---

## ⚙️ Partie C — Scripts et automatisation

9. Connectez-vous en tant que `alice` et créez un script `backup_alpha.sh` :
   ```bash
   #!/bin/bash
   SRC="/srv/projets/alpha"
   DEST="/home/alice/sauvegardes"
   mkdir -p "$DEST"
   cp -r "$SRC" "$DEST/backup_$(date +%F_%H-%M-%S)"
   echo "$(date): sauvegarde réussie" >> /home/alice/backup.log
   ```

10. Rends le script exécutable :
    ```bash
    chmod u+x ~/backup_alpha.sh
    ```

11. Teste le script manuellement, puis vérifie :
    - qu’un dossier de sauvegarde a été créé,  
    - que le log a été mis à jour.

---

## 🕒 Partie D — Planification avec `cron`

12. En tant qu’utilisateur `alice`, édite la crontab :
    ```bash
    crontab -e
    ```
    et ajoute :
    ```
    0 22 * * * /home/alice/backup_alpha.sh >> /home/alice/cron.log 2>&1
    ```

13. Vérifie le lendemain matin que :
    - une nouvelle sauvegarde a bien été créée,  
    - le log `cron.log` contient une trace d’exécution.

14. Pour tester plus rapidement, change la fréquence :
    ```
    */2 * * * * /home/alice/backup_alpha.sh >> /home/alice/cron.log 2>&1
    ```
    → Le script s’exécutera toutes les 2 minutes.

---

## 🧠 Partie E — Contrôle des permissions

15. Crée un script `verif_permissions.sh` (exécuté par `root`) :
   ```bash
   #!/bin/bash
   REP="/srv/projets/alpha"
   LOG="/var/log/permissions_check.log"

   if [ -w "$REP" ]; then
     echo "$(date): permissions OK sur $REP" >> $LOG
   else
     echo "$(date): ⚠️ problème d'accès sur $REP" >> $LOG
   fi
   ```

16. Planifie ce script pour s’exécuter chaque jour à 7h du matin :
   ```bash
   sudo crontab -e
   ```
   et ajoute :
   ```
   0 7 * * * /root/verif_permissions.sh
   ```

17. Consulte `/var/log/permissions_check.log` après exécution pour vérifier le résultat.

---

## ⚡ Partie F — Challenge final : simulation d’équipe

🎯 **Scénario :**
Vous administrez un petit environnement de développement avec deux équipes : `devs` et `managers`.  
Chaque groupe doit avoir ses accès, ses sauvegardes et ses vérifications automatiques.

### À faire :

1. Créez :
   ```
   /srv/entreprise/
     ├── devs/
     │   ├── alpha/
     │   └── beta/
     ├── managers/
     │   └── rapports/
     ├── sauvegardes/
     └── logs/
   ```

2. Configurez les droits :
   - `devs` → écriture dans `alpha/` et `beta/`  
   - `managers` → lecture seule sur ces deux projets  
   - tout le monde → lecture sur `rapports/`

3. Créez un script `/usr/local/bin/maintenance.sh` :
   ```bash
   #!/bin/bash
   SRC="/srv/entreprise/devs"
   DEST="/srv/entreprise/sauvegardes"
   mkdir -p "$DEST"
   cp -r "$SRC" "$DEST/backup_$(date +%F_%H-%M-%S)"
   echo "$(date): maintenance effectuée" >> /srv/entreprise/logs/maintenance.log
   ```

4. Rendez ce script exécutable par `root` uniquement.

5. Planifiez-le via `sudo crontab -e` :
   ```
   30 23 * * * /usr/local/bin/maintenance.sh
   ```

6. Vérifiez les logs et les sauvegardes le lendemain.

---

## 📎 Annexe — Rappels et notions utiles

### 🔸 Gestion utilisateurs et groupes
```bash
sudo useradd -m utilisateur           # crée un compte
sudo passwd utilisateur               # change le mot de passe
sudo groupadd nom_groupe              # crée un groupe
sudo usermod -aG groupe utilisateur   # ajoute un utilisateur à un groupe
id utilisateur                        # affiche les infos de groupe
```

### 🔸 Permissions et propriétés
```bash
chmod 750 dossier          # rwx pour propriétaire, rx pour groupe
chown alice:devs fichier   # change propriétaire et groupe
ls -l                      # affiche les permissions
stat fichier               # affiche les détails complets
```

### 🔸 Cron et logs
```bash
crontab -e                 # édite les tâches planifiées
crontab -l                 # affiche la crontab
systemctl status cron      # vérifie que le service cron tourne
```

### 🔸 Bonnes pratiques
✅ Toujours tester ses scripts avant de les planifier.  
✅ Ne jamais supprimer ou écraser des sauvegardes sans vérification.  
✅ Organiser les dossiers par groupe, pas par utilisateur.  
✅ Conserver les permissions cohérentes (`umask`, `chmod`, `chown`).
