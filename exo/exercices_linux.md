# Exercices rapides Linux — Déplacement & Création de fichiers

## 🧭 1. Déplacements dans le système de fichiers

**Exercice 1 — Se repérer**
```bash
pwd
```
Affiche le répertoire actuel.

**Exercice 2 — Lister le contenu**
```bash
ls
ls -l
ls -a
```
Observe la différence entre les trois.

**Exercice 3 — Changer de dossier**
```bash
cd /tmp
pwd
```
Vérifie où tu es.

**Exercice 4 — Revenir au dossier personnel**
```bash
cd ~
```
ou
```bash
cd
```

**Exercice 5 — Remonter d’un dossier**
```bash
cd ..
```

---

## 📁 2. Création et gestion de dossiers

**Exercice 6 — Créer un dossier**
```bash
mkdir projets
```

**Exercice 7 — Créer plusieurs dossiers à la fois**
```bash
mkdir documents images videos
```

**Exercice 8 — Créer un sous-dossier**
```bash
mkdir -p projets/linux/exercices
```

---

## 📄 3. Création et manipulation de fichiers

**Exercice 9 — Créer un fichier vide**
```bash
touch notes.txt
```

**Exercice 10 — Créer et écrire dans un fichier**
```bash
echo "Bonjour Linux" > bonjour.txt
```

**Exercice 11 — Ajouter du texte à un fichier**
```bash
echo "Nouvelle ligne" >> bonjour.txt
```

**Exercice 12 — Afficher le contenu**
```bash
cat bonjour.txt
```

**Exercice 13 — Créer plusieurs fichiers**
```bash
touch fichier1.txt fichier2.txt fichier3.txt
```

---

## 🚚 4. Déplacer, copier, supprimer

**Exercice 14 — Déplacer un fichier**
```bash
mv bonjour.txt projets/linux/
```

**Exercice 15 — Copier un fichier**
```bash
cp projets/linux/bonjour.txt .
```

**Exercice 16 — Supprimer un fichier**
```bash
rm fichier1.txt
```

**Exercice 17 — Supprimer un dossier**
```bash
rm -r projets/linux/exercices
```

---

## ⚡ 5. Challenge express

Essaie de faire ceci en **une série de commandes** :

1. Crée un dossier `testlinux`.
2. Entre dedans.
3. Crée trois fichiers (`a.txt`, `b.txt`, `c.txt`).
4. Écris ton prénom dans `a.txt`.
5. Copie `a.txt` en `b.txt`.
6. Déplace `c.txt` dans un sous-dossier `archive`.

---

💡 *Astuce : utilise `&&` pour enchaîner plusieurs commandes sur une seule ligne !*
