# React + TypeScript + Vite + shadcn/ui

This is a template for a new Vite project with React, TypeScript, and shadcn/ui.

# Feature

feat(properties): add advanced price range filter
feat(auth): implement JWT refresh token logic

# Fix

fix(api): handle 401 errors with token refresh
fix(properties): correct pagination offset calculation

# Refactor

refactor(properties): extract search logic to custom hook
refactor(api): simplify error handling with ApiError class

# Docs

docs(readme): add architecture diagram
docs(design-system): document spacing tokens

# Chore

chore(deps): upgrade react-query to v5
chore(config): add ESLint rule for import order

### **Naming Conventions**

📖 **Documentation complète** : [`src/core/config/naming-conventions.md`](src/core/config/naming-conventions.md)

#### **Fichiers & Dossiers**

```
Components      → PascalCase        → PropertyCard.tsx
Pages           → PascalCase.page   → PropertyDetail.page.tsx
Hooks           → camelCase.ts      → useProperties.ts
Utils           → kebab-case.ts     → format-price.ts
Types           → kebab-case.types  → property.types.ts
Stores          → kebab-case-store  → property-filters-store.ts
API Services    → kebab-case.api    → properties.api.ts
TanStack Query  → kebab-case.queries → properties.queries.ts
```

## 📂 Structure du Projet

```
src/
├── app/                          # Application core
│   ├── layouts/                  # Layouts réutilisables
│   │   └── RootLayout.tsx        # Layout principal avec header/footer
│   ├── providers/                # Providers globaux
│   │   ├── AppProviders.tsx      # Wrapper de tous les providers
│   │   └── QueryProvider.tsx     # TanStack Query config
│   └── router/                   # Configuration routing
│       ├── index.tsx             # Router instance
│       └── routes.tsx            # Routes definitions
│
├── core/                         # Partagé entre TOUTES les features
│   ├── api/                      # API client & configuration
│   │   ├── api-client.ts         # Fetch wrapper avec intercepteurs
│   │   ├── api-error.ts          # Gestion d'erreurs API
│   │   └── endpoints.ts          # URLs des endpoints
│   │
│   ├── config/                   # Configuration app-wide
│   │   ├── 01-env.ts             # Variables d'environnement
│   │   ├── design-tokens.md      # Documentation Design System
│   │   └── naming-conventions.md # Conventions de nommage
│   │
│   ├── hooks/                    # Custom hooks partagés
│   │
│   ├── lib/                      # Utilitaires & helpers
│   │   └── utils.ts              # Fonctions utilitaires (cn, formatters)
│   │
│   ├── stores/                   # Zustand stores (client state)
│   │   ├── index.ts              # Export barrel
│   │   ├── property-filters-store.ts  # État filtres propriétés
│   │   └── ui-store.ts           # État global UI
│   │
│   ├── types/                    # Types TypeScript partagés
│   │   ├── auth.types.ts         # Types authentification
│   │   ├── common.types.ts       # Types communs (Pagination, etc.)
│   │   ├── property.types.ts     # Types propriétés
│   │   └── index.ts              # Export barrel
│   │
│   └── ui/                       # shadcn/ui components (base)
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ...                   # Composants shadcn installés
│
├── features/                     # Features métier (domain-driven)
│   │
│   ├── properties/               # Feature: Gestion propriétés
│   │   ├── api/
│   │   │   ├── properties.queries.ts  # TanStack Query hooks
│   │   │   └── properties.service.ts  # API calls
│   │   ├── components/
│   │   │   ├── PropertiesList.tsx
│   │   │   └── PropertyDetail.tsx
│   │   ├── hooks/                # Hooks spécifiques propriétés
│   │   └── types/                # Types spécifiques propriétés
│   │
│   ├── agents/                   # Feature: Gestion agents
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   │
│   ├── auth/                     # Feature: Authentification
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   │
│   └── photos/                   # Feature: Gestion photos
│       ├── api/
│       ├── components/
│       ├── hooks/
│       └── types/
│
├── pages/                        # Page components (thin layer)
│   ├── public/                   # Pages publiques
│   │   ├── Home.page.tsx
│   │   ├── Properties.page.tsx
│   │   └── PropertyDetail.page.tsx
│   │
│   ├── agent/                    # Pages agent (dashboard, etc.)
│   ├── auth/                     # Pages auth (login, register)
│   ├── user/                     # Pages user (favoris, profil)
│   └── errors/                   # Pages d'erreur
│       └── NotFound.page.tsx
│
├── assets/                       # Assets statiques
│   └── react.svg
│
├── App.tsx                       # Root component
├── main.tsx                      # Entry point
└── index.css                     # Global styles + Design Tokens
```
