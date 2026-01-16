# House Price 🏠

Une plateforme complète d'estimation et de recherche immobilière bâtie avec les technologies web les plus récentes. Ce projet démontre des principes d'ingénierie full-stack, une architecture scalable et des stratégies d'optimisation de performance appliquées au marché immobilier français.

**Note :** Ce projet est à la fois un exercice d'apprentissage approfondi et une pièce de portfolio illustrant une méthodologie d'ingénierie logicielle — l'accent est mis sur la qualité de l'architecture plutôt que sur la simple accumulation de fonctionnalités.

## 📚 Ressources de Documentation

- [Documentation du Design System](./src/core/config/design-tokens.md)
- [Guide des Conventions de Nommage](./src/core/config/naming-conventions.md)
- [🔥 Étude de Cas : Optimisation Performance & Render-as-you-fetch](./src/core/config/case-study-render-as-you-fetch.md)

## 🎯 Vision du Projet

House Price réimagine la découverte immobilière en combinant une navigation intuitive et une architecture robuste. Le projet s'inspire des meilleurs standards du marché (SeLoger, Compass) tout en adaptant des patterns éprouvés aux besoins techniques modernes.

Le projet illustre une réflexion d'ingénieur via :

- Une résolution de problèmes systématique plutôt que des implémentations rapides.
- Des choix architecturaux pensés pour la maintenance et l'évolutivité.
- La performance comme principe de design, et non comme une correction après-coup.
- La sécurité des types (Type Safety) sur l'ensemble de la stack.

## 🏗️ Architecture & Décisions Techniques

### Architecture Frontend : Organisation par "Features"

Le code utilise une structure domain-driven (orientée domaine) plutôt qu'une séparation par couches techniques. Cette approche résout trois problèmes critiques :

- **Itération Produit Accélérée :** La logique métier est regroupée, réduisant la navigation entre les fichiers.
- **Prévention des Régressions :** Les modifications d'une fonctionnalité sont isolées dans leur dossier respectif.
- **Évolution Facilitée :** L'ajout de nouvelles fonctionnalités n'impacte pas les modules existants.

```
src/features/properties/          # Domaine métier autonome
  ├── api/                        # Requêtes, mutations, couche service
  ├── components/                 # UI spécifique au domaine
  ├── hooks/                      # Logique métier encapsulée
  └── types/                      # Modèles de données
```

**Principe de design :** Les composants génériques vivent dans core/ui/. Les composants liés au métier restent dans leur feature. Cela évite le couplage et garde la couche partagée légère.

### Design System : L'approche "Tokens-First"

Au lieu de valeurs arbitraires, le projet implémente un système complet de Design Tokens basé sur l'espace colorimétrique OKLCH (perceptuellement exact) via Tailwind CSS v4 :

- Couleurs sémantiques (primary, secondary, states) avec une précision visuelle constante.
- Échelle typographique et système d'espacement rigoureux.
- Thématisation simplifiée : un seul changement de token met à jour toute la plateforme.

### Gestion d'État : Séparation Serveur / UI

La gestion d'état est délibérément scindée pour éviter la complexité inutile :

- **TanStack Query (État Serveur) :** Gère le cache, les re-feths, et les états de chargement.
- **MobX (État UI) :** Gère l'état local pur (modales, filtres temporaires, préférences utilisateur).

## ⚡ Optimisations de Performance (Stratégies de Choc)

### 1. Pattern "Render-as-you-fetch" (RRv7 Loaders)

L'application utilise le Data Router de React Router v7 pour éliminer les "Waterfalls" (chargements en cascade).

- Les données sont préchargées via des loaders et queryClient.prefetchQuery.
- Le téléchargement des données commence en même temps que le chargement du code JavaScript de la page, et non après.

### 2. Stabilité Visuelle & CLS Zéro

Pour garantir un score CLS (Cumulative Layout Shift) de 0 :

- **Shell UI Stable :** Le Header et la barre de recherche sont importés de manière statique pour éviter tout saut visuel au chargement.
- **HydrateFallback :** Un système de Skeletons synchronisés affiche la structure de la page dès la première milliseconde, avant même l'hydratation de React.

### 3. Stratégie d'Image Prioritaire

Optimisation du LCP (Largest Contentful Paint) par la gestion intelligente des priorités :

- Utilisation de fetchPriority="high" et loading="eager" pour les images visibles immédiatement.
- Chargement "lazy" pour les images hors-écran.

## 📊 Stack Technique

| Couche          | Technologie              | Pourquoi ?                                                      |
| --------------- | ------------------------ | --------------------------------------------------------------- |
| Frontend        | React 19 + TypeScript    | Type safety, dernières API (Suspense, Transitions), écosystème  |
| Routage         | React Router v7          | Data Loaders, Render-as-you-fetch, gestion native du cache      |
| État            | TanStack Query v5 + MobX | Gestion automatique du cache serveur, état UI léger             |
| Styling         | Tailwind CSS v4          | Performance CSS, design tokens natifs, configuration simplifiée |
| Carousel        | Embla Carousel           | Léger, performant, sans dépendances lourdes                     |
| Backend         | FastAPI + SQLAlchemy     | Performance asynchrone, docs OpenAPI auto, élégance de l'ORM    |
| Base de données | PostgreSQL               | Intégrité relationnelle, support JSON, fiabilité                |

## 📁 Structure du Projet

```
src/
├── app/                          # Cœur de l'application
│   ├── layouts/                  # Layouts (RootLayout stable)
│   ├── providers/                # Providers globaux (Query, Router)
│   └── router/                   # Configuration des routes & loaders
│
├── core/                         # Partagé par TOUTES les features
│   ├── api/                      # Client API, intercepteurs
│   ├── config/                   # Design tokens, constantes
│   ├── components/               # Composants UI atomiques (Base UI)
│   └── stores/                   # Stores MobX globaux
│
├── features/                     # Modules orientés domaine
│   ├── properties/               # Logique immobilière (vente/location)
│   ├── header/                   # Navigation et recherche stable
│   └── home/                     # Composants spécifiques à la page d'accueil
│
└── pages/                        # Pages légères (couche de routage)
```

## 🔄 Workflow de Développement

### Conventions Git (Conventional Commits)

Le projet suit une structure de commit rigoureuse pour la lisibilité et l'automatisation :

```
feat(properties): add advanced price range filter
perf(router): implement prefetchQuery in loaders
refactor(layout): stabilize header for CLS optimization
```

### Qualité du Code

- Mode Strict TypeScript : Erreurs détectées à la compilation.
- Zéro type any : Typage fort sur l'ensemble de la stack.
- Analyse de performance : Utilisation systématique du Profiler React et de Lighthouse pour valider chaque changement architectural.

## 👨‍💻 Auteur

Développé par Christian.L comme démonstration des principes d'ingénierie moderne et de réflexion architecturale.

**Dernière mise à jour :** Janvier 2026 | **Statut :** Développement Actif (Optimisation Performance)
