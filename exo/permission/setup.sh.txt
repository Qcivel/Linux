#!/usr/bin/env bash
set -euo pipefail

# Dossier racine des exercices (dans le HOME de l'utilisateur)
BASE_DIR="${HOME}/exercices_permissions_base"
mkdir -p "${BASE_DIR}"
cd "${BASE_DIR}"

# Dossiers (noms longs pour entraîner la complétion au TAB)
mkdir -p documents_confidentiels_direction
mkdir -p docs_projets_2025_partage_equipe
mkdir -p zone_echanges_temps_limite
mkdir -p scripts_operations_quotidiennes
mkdir -p ressources_formations_utilisateurs

# Fichiers
printf "Budget prévisionnel – très sensible\n" > documents_confidentiels_direction/rapport_budgetaire_previsionnel_2025_confidentiel.txt
printf "Backlog Sprint 12\n- Tâche A\n- Tâche B\n" > docs_projets_2025_partage_equipe/liste_taches_projet_alpha_sprint_12.txt
printf "Fichier à manipuler par plusieurs personnes\n" > zone_echanges_temps_limite/fichier_partage_modifiable_par_tous.txt
printf "#!/usr/bin/env bash\necho 'Rapport quotidien'\n" > scripts_operations_quotidiennes/script_generation_rapport_quotidien.sh
printf "#!/usr/bin/env bash\necho 'Nettoyage simple'\n" > scripts_operations_quotidiennes/script_nettoyage_temporaire.sh
printf "Guide utilisateur – version 1.0\n" > ressources_formations_utilisateurs/guide_utilisateur_demarrage_rapide_v1.txt

# Permissions de départ (basiques)
chmod 600 documents_confidentiels_direction/rapport_budgetaire_previsionnel_2025_confidentiel.txt
chmod 664 docs_projets_2025_partage_equipe/liste_taches_projet_alpha_sprint_12.txt
chmod 666 zone_echanges_temps_limite/fichier_partage_modifiable_par_tous.txt
chmod 644 scripts_operations_quotidiennes/script_generation_rapport_quotidien.sh
chmod 600 scripts_operations_quotidiennes/script_nettoyage_temporaire.sh
chmod 644 ressources_formations_utilisateurs/guide_utilisateur_demarrage_rapide_v1.txt

echo "✅ Environnement de base créé dans ${BASE_DIR}"
