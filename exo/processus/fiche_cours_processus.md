# 📘 FICHE COURS — Gestion des processus et des services

## 🔹 1. Qu’est-ce qu’un processus ?
Un **processus** est un **programme en cours d’exécution**. Chaque fois que tu lances une commande ou une application, un nouveau processus est créé et reçoit un **PID** (*Process ID*).

Exemples rapides :
```bash
firefox &
code &
./mon_script.sh
```

---

## 🔹 2. Observer les processus

### a) Lister les processus
```bash
ps            # processus liés à ton terminal
ps aux        # tous les processus du système
```
Colonnes utiles : `PID` (identifiant), `USER`, `%CPU`, `%MEM`, `COMMAND`.

### b) Filtrer un processus précis
```bash
ps aux | grep firefox
```

### c) Vue dynamique
```bash
top           # quitter: q   tuer: k
```

---

## 🔹 3. Gérer les processus (jobs shell)

### a) Lancer en arrière-plan
Ajoute `&` à la fin :
```bash
./script_bg.sh &
```
Le shell affiche un **numéro de job** et un **PID** : `[1] 1234`.

### b) Mettre en pause (suspendre) / reprendre
- Suspendre le processus au premier plan : **Ctrl+Z**
- Voir les jobs du shell : `jobs`
- Reprendre au premier plan : `fg %1`
- Reprendre en arrière-plan : `bg %1`

---

## 🔹 4. Arrêter un processus (proprement)

### a) Avec le PID
```bash
kill 1234        # SIGTERM (propre)
kill -9 1234     # SIGKILL (forcé, dernier recours)
```

### b) Avec le numéro de job du shell
```bash
jobs             # ex: [1]+  Running  ./script_bg.sh &
kill %1
```

### c) Par nom
```bash
pkill -f script_bg.sh
```

> ⚠️ Utilise `kill -9` uniquement si le processus ne répond plus.

---

## 🔹 5. Exemples de scripts de démonstration

> Tape ces scripts **à la main** pour bien comprendre ce que fait chacun. Place-les dans `~/demo_processus/` et rends-les exécutables (`chmod +x ...`).

### a) `script_bg.sh` — Boucle “qui vit” en arrière-plan
```bash
#!/bin/bash
# Affiche l'heure toutes les 5 secondes (Ctrl+Z pour suspendre, fg/bg pour jouer)
while true; do
  echo "Processus actif - $(date '+%F %T')"
  sleep 5
done
```

### b) `script_long.sh` — Tâche longue finie
```bash
#!/bin/bash
# Simule un travail long (2 minutes) puis s'arrête
echo "Début du traitement à $(date '+%T')"
sleep 120
echo "Fin du traitement à $(date '+%T')"
```

### c) `script_io.sh` — Écrit dans un log
```bash
#!/bin/bash
# Ecrit régulièrement dans un fichier de log
LOG="$HOME/demo_processus/ecriture.log"
mkdir -p "$(dirname "$LOG")"
while true; do
  echo "$(date '+%F %T') : ligne écrite" >> "$LOG"
  sleep 10
done
```

### d) `script_cpu.sh` — Charge CPU légère (avec nice)
```bash
#!/bin/bash
# Boucle calcul : lancer avec 'nice -n 10 ./script_cpu.sh &' pour baisser la priorité
i=0
while true; do
  i=$((i+1))
  : # opération nulle, juste pour occuper un peu le CPU
done
```

> 💡 Pour éviter de gêner la machine, lance `script_cpu.sh` avec **nice** : `nice -n 10 ./script_cpu.sh &`

---

## 🔹 6. Priorité et ressources

Afficher la priorité (nice value) :
```bash
ps -o pid,ni,comm | head
```

Changer la priorité d’un processus existant :
```bash
sudo renice +5 <PID>
```

Lancer une commande avec une priorité plus basse :
```bash
nice -n 10 ./long_script.sh &
```

---

## 🔹 7. Les services système (daemons)

Un **service** est un processus qui tourne **en arrière-plan** et fournit une fonction (ex : `cron`, `apache2`).

### a) Vérifier l’état
```bash
systemctl status cron
```

### b) Démarrer / redémarrer (VM distante : ne **jamais** stopper `ssh`)
```bash
sudo systemctl start cron
sudo systemctl restart cron
```

### c) Activer au démarrage
```bash
sudo systemctl enable cron
```

---

## 🔹 8. Exemple : supervision simple
```bash
#!/bin/bash
# verif_service.sh — Vérifie si cron est actif
if systemctl is-active --quiet cron; then
  echo "$(date): cron OK" >> ~/logs/monitor.log
else
  echo "$(date): ⚠️ cron arrêté" >> ~/logs/monitor.log
fi
```

---

## 🔹 9. Bonnes pratiques
- Préfère `kill` (SIGTERM) à `kill -9`.
- Utilise `jobs`, `fg`, `bg` pour manipuler proprement les jobs.
- Teste tes scripts avant de les automatiser.
- Sur VM distante, **ne touche pas** au service `ssh`.
