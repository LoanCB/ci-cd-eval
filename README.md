# CI/CD Evaluation Project

## Installation et démarrage

```sh
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## Explication de la logique CI/CD

### Actions GitHub

#### Fichier `.github/workflows/push.yml`

Cette action est déclenchée lors de chaque `push` sur le dépôt.

**Étapes :**
1. **Checkout on branch** : Utilise l'action `actions/checkout@v4` pour récupérer le code source du dépôt.
2. **Lint Dockerfile** : Utilise l'action `hadolint/hadolint-action@v3.1.0` pour vérifier la syntaxe du Dockerfile.
3. **Build project image** : Construit l'image Docker du projet avec la commande `docker image build --tag="${IMAGE_NAME}" ./`.
4. **Lint, build and run test** : Exécute les commandes `npm run lint`, `npm run build` et `npm run test` dans un conteneur Docker.
5. **Login to Docker Hub** : Se connecte à Docker Hub si la branche est `main` ou si un tag est poussé. Utilise l'action `docker/login-action@v3` avec les secrets `DOCKERHUB_TOKEN`.
6. **Push release image to docker hub** : Pousse l'image Docker sur Docker Hub si un tag est poussé. Utilise l'action `docker/build-push-action@v6`.
7. **Push unstable release to docker hub** : Pousse l'image Docker sur Docker Hub avec le tag `unstable` si la branche est `main`. Utilise l'action `docker/build-push-action@v6`.

#### Fichier `.github/workflows/release.yml`

Cette action est déclenchée lors de la création d'un tag correspondant au pattern `v*`.

**Étapes :**
1. **Checkout** : Utilise l'action `actions/checkout@v4` pour récupérer le code source du dépôt.
2. **Create Release** : Utilise l'action `softprops/action-gh-release@v1` pour créer une release GitHub avec des notes de release générées automatiquement. Utilise le secret `GITHUB_TOKEN`.

### Livrables

- **Images Docker** : Les images Docker sont construites et poussées sur Docker Hub. Les images peuvent être taguées comme `unstable` ou avec un numéro de version spécifique.
- **Releases GitHub** : Les releases sont créées automatiquement lors de la création de tags, avec des notes de release générées automatiquement.

### Cycle de vie de déploiement & livraison

1. **Développement** : Les développeurs travaillent sur des branches de fonctionnalités et poussent leurs changements.
2. **Intégration continue** : Chaque `push` déclenche l'action `push.yml` qui vérifie, construit et teste le code.
3. **Déploiement continu** : Si les tests passent et que la branche est `main` ou un tag, l'image Docker est poussée sur Docker Hub.
4. **Release** : La création d'un tag déclenche l'action `release.yml` qui crée une release GitHub avec des notes de release.

### Utilisation des technologies

- **Docker** : Utilisé pour containeriser l'application et assurer la cohérence des environnements.
- **GitHub Actions** : Utilisé pour automatiser les workflows CI/CD.
- **Secrets** : Les secrets `DOCKERHUB_TOKEN` et `GITHUB_TOKEN` sont utilisés pour sécuriser les informations sensibles nécessaires pour se connecter à Docker Hub et créer des releases GitHub.

### Utilisation des Issues

Les issues GitHub sont utilisées pour organiser le travail. Chaque fonctionnalité, bug ou amélioration est suivi via une issue. Les développeurs peuvent assigner des issues, ajouter des labels et des milestones pour suivre l'avancement du projet.