# 🧭 FICHE COURS – Scripting Bash

## 🔹 1. Introduction
Le **Bash** (Bourne Again Shell) est un **interpréteur de commandes** sous Linux/Unix.  
Un **script Bash** est un fichier texte contenant une suite de commandes exécutées automatiquement.

**Extension :** `.sh`  
**Première ligne obligatoire (shebang) :**
```bash
#!/bin/bash
```

## 🔹 2. Exécution d’un script
- Donner les droits d’exécution :
  ```bash
  chmod +x mon_script.sh
  ```
- Lancer le script :
  ```bash
  ./mon_script.sh
  ```
ou  
  ```bash
  bash mon_script.sh
  ```

## 🔹 3. Variables

**Déclaration :**
```bash
prenom="Alice"
```

**Utilisation :**
```bash
echo "Bonjour $prenom"
```

**Lire une valeur entrée par l’utilisateur :**
```bash
read -p "Entrez votre âge : " age
echo "Vous avez $age ans"
```

**Variable système :**
- `$0` → nom du script  
- `$1`, `$2`, … → arguments  
- `$#` → nombre d’arguments  
- `$?` → code retour de la dernière commande

## 🔹 4. Opérations et conditions

**Opérations arithmétiques :**
```bash
a=5
b=3
((somme=a+b))
echo $somme    # affiche 8
```

**Conditions :**
```bash
if [ $a -gt $b ]; then
  echo "a est plus grand"
else
  echo "b est plus grand"
fi
```

**Comparaisons courantes :**
| Type     | Opérateur | Exemple |
|-----------|------------|----------|
| Numérique | `-eq`, `-ne`, `-lt`, `-le`, `-gt`, `-ge` | `[ $a -lt 10 ]` |
| Chaîne    | `=`, `!=`, `-z` (vide), `-n` (non vide) | `[ "$var" = "ok" ]` |

## 🔹 5. Boucles

**Boucle for :**
```bash
for i in 1 2 3; do
  echo "Compteur : $i"
done
```

**Boucle while :**
```bash
count=0
while [ $count -lt 3 ]; do
  echo "Itération $count"
  ((count++))
done
```

## 🔹 6. Fonctions

**Définition :**
```bash
ma_fonction() {
  echo "Salut $1"
}
ma_fonction "Bob"   # Appel de la fonction
```

## 🔹 7. Gestion des fichiers

**Tester l’existence d’un fichier ou dossier :**
```bash
if [ -f fichier.txt ]; then
  echo "Le fichier existe"
fi

if [ -d dossier ]; then
  echo "Le dossier existe"
fi
```

**Redirections :**
- `>` → écrase un fichier  
- `>>` → ajoute à la fin  
- `2>` → redirige les erreurs  
- `|` → passe la sortie d’une commande à une autre  

Exemple :
```bash
ls > liste.txt
grep "test" fichier.txt | wc -l
```

## 🔹 8. Exemple complet

```bash
#!/bin/bash
# Script : compteur d’arguments

echo "Ce script s’appelle $0"
echo "Nombre d’arguments : $#"

if [ $# -eq 0 ]; then
  echo "Aucun argument donné."
else
  for arg in "$@"; do
    echo "Argument : $arg"
  done
fi
```
