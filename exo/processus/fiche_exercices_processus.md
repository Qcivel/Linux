# 🧩 FICHE D’EXERCICES — Processus et Services

> 📘 Toutes les réponses se trouvent dans la fiche *Gestion des processus et des services*.
> Crée d'abord le dossier `~/demo_processus/` et tape les scripts d'exemple à la main.

---

## 🧭 Partie A — Démarrage et observation

1) Crée `script_bg.sh`, `script_long.sh`, `script_io.sh` et `script_cpu.sh` (voir fiche cours), rends-les exécutables.  
2) Lance `./script_bg.sh &` puis :
   - affiche les **jobs** (`jobs`),
   - trouve son **PID** (`ps`),
   - observe-le dans `top`.
3) Suspend `script_bg.sh` (**Ctrl+Z**) puis :
   - reprends-le au **premier plan** (`fg`),
   - renvoie-le en **arrière-plan** (`bg`).

---

## ⚙️ Partie B — Arrêter proprement

4) Arrête `script_bg.sh` par **PID** (`kill <PID>`).  
5) Relance-le, puis arrête-le par **numéro de job** (`kill %1`).  
6) Lance `script_io.sh &`, vérifie que le fichier `ecriture.log` grossit, puis **arrête-le par nom** (`pkill -f script_io.sh`).  
7) Teste `kill -9` uniquement si nécessaire et note la différence.

---

## 📈 Partie C — Priorité (nice/renice)

8) Lance `script_cpu.sh` avec une priorité **basse** (indice : `nice -n 10 ...`).  
9) Vérifie sa **nice value** avec `ps -o pid,ni,comm | grep script_cpu.sh`.  
10) Change sa priorité pendant l’exécution (`renice`) et observe l’impact dans `top` (CPU plus ou moins élevé).  
11) Arrête `script_cpu.sh` proprement.

---

## ⚙️ Partie D — Services système (VM distante : safe)

12) Vérifie l’état du service `cron`.  
13) Redémarre **cron** et confirme qu’il est actif.  
14) Active **cron** au démarrage si ce n’est pas déjà fait.

> ⚠️ Ne jamais stopper/désactiver `ssh` sur une machine distante.

---

## 🧪 Partie E — Mini supervision (option)

15) Crée `verif_service.sh` (voir fiche cours) et planifie-le toutes les 5 minutes via `cron`.  
16) Vérifie les écritures dans `~/logs/monitor.log` après quelques exécutions.  
17) Bonus : ajoute un test `pgrep -f script_bg.sh` pour consigner si le script tourne encore.

---

## ⚡ Partie F — Challenge final

18) Écris un script `gestion_jobs.sh` qui :
- lance `script_bg.sh` et `script_io.sh` en arrière-plan,
- affiche leurs PIDs et leurs numéros de jobs,
- attend 30 secondes, puis **stoppe proprement** les deux (par **nom** et par **job**),
- écrit un petit **rapport** dans `~/demo_processus/rapport.txt`.

19) Lance-le et vérifie le rapport généré.
