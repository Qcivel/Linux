# 🔍 Exercices Linux — Commandes `find` et `grep`

## 📘 Documentation essentielle

### 🔍 La commande `find`

**Syntaxe :**
```bash
find [chemin] [options] [critère] [action]
```

**Options utiles :**
| Option | Description |
|:-------|:-------------|
| `-name` | Cherche par nom de fichier |
| `-type f` | Cherche uniquement des fichiers |
| `-type d` | Cherche uniquement des dossiers |
| `-mtime n` | Fichiers modifiés il y a *n* jours |
| `-size +10M` | Fichiers de plus de 10 Mo |
| `-empty` | Fichiers ou dossiers vides |
| `-exec CMD {} \;` | Exécute une commande sur chaque résultat |
| `-maxdepth n` | Limite la profondeur de recherche |
| `-not` ou `!` | Négation d’un critère |

**Exemples typiques :**
```bash
find /home/user -name "*.txt"
find . -type f -size +5M
find . -type f -empty
find . -type f -exec ls -lh {} \;
```

---

### 🧾 La commande `grep`

**Syntaxe :**
```bash
grep [options] "motif" [fichier(s)]
```

**Options utiles :**
| Option | Description |
|:-------|:-------------|
| `-r` ou `-R` | Recherche récursive dans les sous-dossiers |
| `-i` | Ignore la casse |
| `-n` | Affiche le numéro de ligne |
| `-v` | Inverse la recherche (exclut le motif) |
| `-l` | Affiche seulement le nom des fichiers contenant le motif |
| `-c` | Compte le nombre de lignes correspondantes |
| `--color=auto` | Met en surbrillance les correspondances |

**Exemples typiques :**
```bash
grep "Linux" notes.txt
grep -r "sudo" /etc
grep -i "bonjour" *.txt
grep -v "erreur" fichier.log
```

---

## 🧪 Exercices pratiques

### Préparation de l’environnement
```bash
mkdir -p ~/super_long_nom_de_dossier_pour_entrainement_find_grep/{dossier_documents_importants_2025,dossier_projets_en_cours_a_sauvegarder,dossier_logs_systeme_utilisateur}
cd ~/super_long_nom_de_dossier_pour_entrainement_find_grep

echo "Bonjour Linux" > dossier_documents_importants_2025/rapport_technique_systeme_linux.txt
echo "Erreur critique détectée" > dossier_logs_systeme_utilisateur/log_erreur_serveur.txt
echo "Mise à jour réussie" > dossier_logs_systeme_utilisateur/log_succes_maj.txt
echo "TODO: sauvegarde projet Alpha" > dossier_projets_en_cours_a_sauvegarder/todo_alpha.txt
echo "TODO: sauvegarde projet Beta" > dossier_projets_en_cours_a_sauvegarder/todo_beta.txt
touch dossier_projets_en_cours_a_sauvegarder/fichier_vide.tmp
```

---

## 🧭 Partie 1 — Exercices `find`

1. Trouve tous les fichiers `.txt` dans tout le répertoire `super_long_nom_de_dossier_pour_entrainement_find_grep`.
2. Liste uniquement les **dossiers vides**.
3. Recherche tous les fichiers dont le **nom contient "todo"**.
4. Trouve les fichiers **modifiés dans les 2 derniers jours**.
5. Trouve tous les fichiers **de type `.txt`** puis **affiche leur taille** (utilise `-exec`).
6. Trouve tous les fichiers dans `dossier_logs_systeme_utilisateur` **contenant le mot “erreur”** dans leur nom.
7. Trouve les fichiers **plus grands que 1 Ko**.
8. Supprime tous les fichiers vides avec une seule commande `find`.

---

## 🔎 Partie 2 — Exercices `grep`

1. Recherche le mot **"sauvegarde"** dans tous les fichiers du dossier `dossier_projets_en_cours_a_sauvegarder`.
2. Recherche le mot **"TODO"** sans tenir compte de la casse.
3. Compte combien de lignes contiennent le mot **"projet"**.
4. Affiche uniquement le **nom des fichiers** qui contiennent le mot **"erreur"**.
5. Recherche **récursivement** le mot **"Linux"** dans tout le répertoire principal.
6. Exclue toutes les lignes contenant **"succès"** dans les logs.
7. Cherche les lignes contenant **"Alpha"** et affiche les **numéros de ligne**.
8. Combine `find` et `grep` pour chercher tous les fichiers `.txt` contenant le mot **"TODO"** dans tout le dossier.

---

## ⚡ Partie 3 — Challenge final

Crée une commande (en une seule ligne) qui :
1. Cherche tous les fichiers `.txt` de ton dossier principal,
2. Contient le mot **"projet"**,
3. Et affiche seulement les **noms des fichiers** correspondants.

💡 *Astuce : combine `find` + `grep -l` et joue avec les guillemets !*
