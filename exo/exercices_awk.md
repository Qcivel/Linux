# 🧩 Exercices Linux — Commande `awk`

## 📘 Documentation essentielle

### 🧾 Présentation

`awk` est un **langage de traitement de texte en ligne de commande**.  
Il permet de **parcourir des fichiers ligne par ligne**, de **filtrer**, **extraire** et **transformer** des données structurées (comme les fichiers CSV, logs, ou sorties de commandes).

**Syntaxe générale :**
```bash
awk [options] 'pattern { action }' fichier
```

---

### 💡 Concepts clés

| Élément | Description |
|:--------|:-------------|
| `$0` | Ligne entière courante |
| `$1`, `$2`, ... | Champs séparés par un espace (ou un séparateur défini) |
| `NF` | Nombre de champs dans la ligne |
| `NR` | Numéro de la ligne actuelle |
| `FS` | *Field Separator* (séparateur de champs en entrée) |
| `OFS` | *Output Field Separator* (séparateur en sortie) |
| `BEGIN {}` | Bloc exécuté avant la lecture du fichier |
| `END {}` | Bloc exécuté après la lecture du fichier |

---

### ⚙️ Options courantes

| Option | Description |
|:-------|:-------------|
| `-F` | Définit le séparateur de champs (par exemple `-F,` pour les CSV) |
| `-v var=value` | Définit une variable depuis la ligne de commande |
| `--help` | Affiche l’aide |

---

### 📄 Exemples simples

```bash
awk '{print $1}' fichier.txt
awk '{print $1, $3}' fichier.txt
awk -F: '{print $1}' /etc/passwd
awk '/root/ {print $0}' /etc/passwd
awk '{s+=$3} END {print s}' fichier.txt
```

---

## 🧪 Environnement d’entraînement

```bash
mkdir -p ~/super_long_nom_de_dossier_pour_entrainement_awk/{donnees_employes_entreprise_2025,donnees_ventes_hebdomadaires,logs_systeme_long_format}
cd ~/super_long_nom_de_dossier_pour_entrainement_awk

cat > donnees_employes_entreprise_2025/liste_employes.txt <<EOF
Nom    Prenom    Age    Salaire    Departement
Durand Jean 35 2500 IT
Martin Claire 29 3100 Finance
Dupont Alain 42 2800 IT
Lopez Maria 38 2950 RH
EOF

cat > donnees_ventes_hebdomadaires/ventes.csv <<EOF
Semaine,Produit,Quantite,PrixUnitaire
1,Ordinateur,5,750
1,Souris,10,20
2,Ordinateur,3,750
2,Clavier,7,45
EOF

cat > logs_systeme_long_format/logs.txt <<EOF
2025-10-01 10:12:45 user1 LOGIN
2025-10-01 10:15:12 user2 LOGOUT
2025-10-01 11:00:00 user1 ERROR
2025-10-02 09:00:10 user3 LOGIN
EOF
```

---

## 🧭 Partie 1 — Bases de `awk`

1. Affiche le **premier champ** de chaque ligne du fichier `liste_employes.txt`.
2. Affiche le **nom et le salaire** de chaque employé.
3. Affiche uniquement les lignes où le **département** est `IT`.
4. Affiche le **nombre de lignes** dans le fichier (utilise `END {}`).
5. Compte le **nombre total d’employés** du département `Finance`.
6. Calcule la **moyenne des salaires**.
7. Affiche le **dernier champ** de chaque ligne (utilise `NF`).

---

## 💰 Partie 2 — Traitement de fichiers CSV

1. Affiche le nom du **produit** et le **prix total** (`Quantite * PrixUnitaire`) pour chaque ligne du fichier `ventes.csv`.
2. Calcule le **chiffre d’affaires total** de toutes les ventes.
3. Calcule le chiffre d’affaires de la **Semaine 1 uniquement**.
4. Affiche les produits dont le **prix unitaire est supérieur à 100**.
5. Trie les ventes par produit (astuce : `sort` après `awk`).

---

## ⚙️ Partie 3 — Utilisation avancée

1. Affiche seulement les **lignes contenant “ERROR”** dans `logs.txt`.
2. Compte le **nombre total d’événements** par utilisateur.
3. Affiche le **nombre total de connexions LOGIN**.
4. Change le séparateur d’entrée pour `,` dans le fichier `ventes.csv` et affiche uniquement le **nom du produit et la quantité**.
5. Crée une sortie formatée :  
   `Produit: Ordinateur — Quantité vendue: 5 — Semaine: 1`
6. Utilise `awk -v taux=1.2` pour **ajouter une augmentation de 20 %** aux salaires et les afficher.

---

## ⚡ Partie 4 — Challenge final

Crée une commande (en une seule ligne) qui :
1. Lit le fichier `liste_employes.txt`,
2. Calcule la **moyenne des salaires par département**,
3. Et affiche le résultat sous la forme :
   ```
   Département: IT — Moyenne: 2650
   Département: Finance — Moyenne: 3100
   Département: RH — Moyenne: 2950
   ```

💡 *Pense à utiliser un tableau associatif en `awk` et à faire le calcul dans le bloc `END`.*
