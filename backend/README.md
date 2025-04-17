#Créer un nouveau projet Laravel dans le dossier backend
"composer create-project laravel/laravel backend"
cd backend

#Installer les packages utiles
"composer require laravel/sanctum"   # Pour l'authentification API
"composer require spatie/laravel-permission"    # Pour la gestion des rôles et permissions

#Configuration de la base de données dans .env
#Modifier les détails de connexion selon votre configuration