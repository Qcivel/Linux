# 📘 FICHE ESSENTIELLE — Utilisateurs, Groupes et Permissions sous Linux

## 🔹 1. Utilisateurs et groupes

### ➤ Créer un utilisateur
```bash
sudo /sbin/adduser alice
```

### ➤ Créer un groupe
```bash
sudo groupadd devs
```

### ➤ Ajouter un utilisateur à un groupe
```bash
sudo usermod -aG devs alice
```

### ➤ Vérifier les groupes d’un utilisateur
```bash
groups alice
id alice
```

### ➤ Supprimer un utilisateur ou un groupe
```bash
sudo deluser alice
sudo groupdel devs
```

---

## 🔹 2. Vérifier les droits d’un fichier ou dossier

### ➤ Afficher les permissions
```bash
ls -l
```
Exemple :
```
drwxrwxr-x 2 alice devs 4096 oct 15 10:00 projet
```
- **d** → dossier
- **rwx** → propriétaire
- **rwx** → groupe
- **r-x** → autres

### ➤ Informations détaillées
```bash
stat projet
```

---

## 🔹 3. Modifier le propriétaire et le groupe
```bash
sudo chown alice fichier.txt
sudo chgrp devs fichier.txt
sudo chown alice:devs fichier.txt
```

---

## 🔹 4. Modifier les permissions

### ➤ Syntaxe symbolique
```bash
chmod u+rwx,g+rx,o-r fichier.txt
```

### ➤ Syntaxe octale
| Droit | Valeur |
|--------|--------|
| r | 4 |
| w | 2 |
| x | 1 |

Exemple :
```bash
chmod 750 fichier.txt
```

---

## 🔹 5. Droits récursifs
```bash
sudo chmod -R 750 /srv/projets
sudo chown -R alice:devs /srv/projets
```

---

## 🔹 6. Héritage automatique du groupe
```bash
sudo chmod g+s /srv/projets
```
ou combiné :
```bash
sudo chmod 2770 /srv/projets
```

---

## 🔹 7. Permissions spéciales

| Bit | Nom | Utilisation | Exemple |
|------|------|--------------|----------|
| **4** | setuid | exécution avec les droits du propriétaire | `chmod 4755 script.sh` |
| **2** | setgid | héritage du groupe | `chmod 2770 dossier` |
| **1** | sticky bit | empêche la suppression par d’autres | `chmod 1777 dossier` |

---

## 🔹 8. Exemples pratiques

### ➤ Dossier partagé entre plusieurs utilisateurs
```bash
sudo mkdir /srv/projets
sudo chown root:devs /srv/projets
sudo chmod 2775 /srv/projets
```

### ➤ Dossier privé d’un utilisateur
```bash
mkdir ~/perso
chmod 700 ~/perso
```

---

## 🧭 En résumé

| Action | Commande |
|--------|-----------|
| Créer un utilisateur | `/sbin/adduser nom` |
| Créer un groupe | `groupadd nom` |
| Ajouter à un groupe | `usermod -aG groupe user` |
| Vérifier les groupes | `groups user` |
| Modifier propriétaire/groupe | `chown user:groupe fichier` |
| Modifier les droits | `chmod [options] droits fichier` |
| Appliquer récursivement | `chmod -R ...` |
| Forcer l’héritage de groupe | `chmod g+s dossier` |
| Dossier partagé de groupe | `chmod 2775 dossier` |
