# House Price 🏠

Une plateforme complète d'estimation et de recherche immobilière bâtie avec les technologies web les plus récentes. Ce projet démontre des principes d'ingénierie full-stack, une architecture scalable et des stratégies d'optimisation de performance appliquées au marché immobilier français.

**Note :** Ce projet est à la fois un exercice d'apprentissage approfondi et une pièce de portfolio illustrant une méthodologie d'ingénierie logicielle — l'accent est mis sur la qualité de l'architecture plutôt que sur la simple accumulation de fonctionnalités.

## 📚 Ressources de Documentation

- [Documentation du Design System](./src/core/config/design-tokens.md)
- [Documentation Storybook](./src/core/config/storybook.md)
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

### Organisation Modulaire (Feature-Based Architecture)

L'application est structurée par domaines métier plutôt que par types de fichiers. Chaque fonctionnalité (`feature`) est un module autonome contenant sa propre logique d'API, ses composants, son store et ses types.

**Encapsulation stricte :** Une feature comme auth gère l'intégralité de son cycle de vie, incluant le token.storage.ts.

**Faible couplage :** Les composants globaux comme la SearchBar sont hébergés dans properties car ils dépendent de son domaine métier, même s'ils sont affichés dans le layout global.

### Hiérarchie des Composants : Core vs Shared

`core/ui/` : Les atomes du Design System (Shadcn). Composants purs sans logique métier (Boutons, Inputs, Badges).

`shared/components/` : Molécules réutilisables et composants marketing (Carrousels, InfoCards, Skeletons) qui ne sont pas liés à un domaine spécifique.

`features/X/components/` : Organismes complexes liés au métier (Cartes de biens, Boutons de favoris, Filtres).

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
├── app/                  # Configuration (Router, Providers, Layouts)
├── core/                 # Le "Noyau" (API Client, Design System UI, Config)
├── shared/               # Briques réutilisables (Hooks, Utils, Marketing)
├── features/             # Logique métier isolée par domaines
│   ├── auth/             # Login, Token storage, Guard
│   ├── properties/       # Biens, Recherche, Filtres, Cartes
│   ├── favorite/         # Gestion des favoris (Bouton, Queries)
│   └── profile/          # Dashboard utilisateur
├── pages/                # Composition des features par route
└── styles/               # CSS global et thèmes
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
- Analyse de performance : Utilisation systématique du Profiler React, React Scan et de Lighthouse pour valider chaque changement architectural.

## 👨‍💻 Auteur

Développé par Christian.L comme démonstration des principes d'ingénierie moderne et de réflexion architecturale.

**Dernière mise à jour :** Janvier 2026 | **Statut :** Développement Actif (Optimisation Performance)
