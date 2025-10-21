# 📘 FICHE COURS — Automatisation & Planification avec `cron`

## 🔹 1. Introduction
`cron` est un **service Linux** qui permet d’**exécuter automatiquement des tâches à intervalles réguliers**.  
Il est couramment utilisé pour :
- effectuer des **sauvegardes automatiques**,  
- nettoyer des fichiers temporaires,  
- générer des rapports ou surveiller le système.

---

## 🔹 2. Le démon `cron`
Le démon `cron` tourne en permanence et lit des fichiers appelés **crontabs**, qui contiennent les commandes à exécuter selon un calendrier.

### Commandes principales :
```bash
crontab -l    # Liste les tâches planifiées
crontab -e    # Édite ou crée la crontab
crontab -r    # Supprime toutes les tâches
```

Vérifier que le service est actif :
```bash
systemctl status cron
```

---

## 🔹 3. Syntaxe d’une crontab

Chaque ligne correspond à une tâche planifiée :

```
# ┌──────── minute (0 - 59)
# │ ┌────── heure (0 - 23)
# │ │ ┌──── jour du mois (1 - 31)
# │ │ │ ┌── mois (1 - 12)
# │ │ │ │ ┌ jour de la semaine (0 - 6, 0=dimanche)
# │ │ │ │ │
# * * * * *  commande à exécuter
```

### Exemples :
```bash
30 2 * * * /home/user/scripts/sauvegarde.sh       # chaque jour à 2h30
0 9 * * 1 /home/user/scripts/rapport_hebdo.sh     # chaque lundi à 9h
*/10 * * * * /home/user/scripts/controle.sh       # toutes les 10 minutes
```

> 💡 `*/5` signifie “toutes les 5 unités” (minutes, heures, etc.)

---

## 🔹 4. Redirections de sortie et gestion des logs

Quand `cron` exécute un script, **rien ne s’affiche à l’écran**.  
Toutes les sorties (messages, erreurs, etc.) doivent donc être **redirigées vers des fichiers** pour être consultées plus tard.

### a) Sortie standard (`stdout`)
```bash
echo "Sauvegarde terminée" >> /home/user/logs/backup.log
```
- `>`  → écrase le contenu du fichier.  
- `>>` → ajoute à la fin du fichier (plus sûr pour conserver l’historique).

### b) Sortie d’erreur (`stderr`)
Les erreurs ne sont **pas** incluses dans la sortie standard.  
Il faut donc les rediriger explicitement avec `2>`.

Exemple :
```bash
/home/user/scripts/backup.sh > /home/user/logs/backup.log 2> /home/user/logs/backup_errors.log
```

### c) Tout rediriger dans un seul fichier
```bash
/home/user/scripts/backup.sh >> /home/user/logs/backup.log 2>&1
```
- `2>&1` → redirige la sortie d’erreur (2) vers la même destination que la sortie standard (1).  
- Ainsi, **tous les messages** (succès et erreurs) se retrouvent dans un seul fichier.

### d) Recevoir les résultats par mail (optionnel)
On peut aussi ajouter en haut de sa crontab :
```bash
MAILTO="votre@email.com"
```
→ Le contenu des sorties sera envoyé à cette adresse.

---

## 🔹 5. Bonnes pratiques

✅ Utilisez **des chemins absolus** (ex : `/home/user/...`).  
✅ Testez toujours vos scripts manuellement avant de les planifier.  
✅ Placez `#!/bin/bash` au début de vos scripts.  
✅ Redirigez les sorties dans des logs pour pouvoir diagnostiquer.  
✅ Nettoyez régulièrement les tâches obsolètes avec `crontab -r`.

---

## 🔹 6. Exemple complet

```bash
#!/bin/bash
# Script : nettoyage.sh
# Supprime les fichiers temporaires de plus de 7 jours

find /home/user/tmp -type f -mtime +7 -exec rm {} \;
echo "$(date '+%F %T') : Nettoyage terminé" >> /home/user/logs/nettoyage.log 2>&1
```

Crontab :
```bash
0 3 * * * /home/user/scripts/nettoyage.sh
```

→ Ce script s’exécutera **chaque jour à 3h du matin** et enregistrera le résultat dans le log.
