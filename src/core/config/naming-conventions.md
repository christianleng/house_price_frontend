# Naming Conventions

## 📚 Ressources d'Apprentissage & Case Studies

### Ressources Générales

- [README.md](../../../README.md)
- [Documentation du Design System](./design-tokens.md)
- 🔥 [Performance Guide - Render as you fetch](./case-study-render-as-you-fetch.md)

## Vue d'ensemble

Ce document définit les conventions de nommage utilisées dans le projet **House Price**. Ces conventions assurent la cohérence, la lisibilité et la maintenabilité du code.

---

## Philosophie

Nous utilisons un **pattern de nommage basé sur les suffixes** avec la notation par points :

```
<Name>.<type>.<extension>
```

**Objectifs :**

- ✅ **Clarté immédiate** : Identifier le rôle d'un fichier sans l'ouvrir
- ✅ **Recherche facilitée** : Filtrer par type avec des glob patterns
- ✅ **Éviter les conflits** : Séparer les responsabilités par convention
- ✅ **Scalabilité** : Structure qui grandit bien avec le projet
- ✅ **Autocompletion IDE** : Regroupement intelligent par nom de base

---

## Conventions par type de fichier

### 📄 **Pages (Routing Layer)**

**Pattern :** `<Name>.page.tsx`

**Rôle :** Composants de niveau page qui gèrent le routing, les paramètres d'URL, et la composition de haut niveau.

**Exemples :**

```
src/pages/
├── public/
│   ├── Home.page.tsx
│   ├── Properties.page.tsx
│   └── PropertyDetail.page.tsx
├── auth/
│   ├── Login.page.tsx
│   └── Register.page.tsx
└── errors/
    └── NotFound.page.tsx
```

**Export :**

```typescript
// Named export avec suffix "Page"
export function PropertiesPage() {
  /* ... */
}
```

**Import :**

```typescript
import { PropertiesPage } from "@/pages/public/Properties.page";
```

**Règles :**

- ✅ Thin layer (10-30 lignes max)
- ✅ Gère uniquement : routing, params URL, metadata SEO
- ❌ Pas de logique métier (déléguer aux composants features)

---

### 🔧 **Services (API Calls)**

**Pattern :** `<name>.service.ts`

**Rôle :** Classes qui héritent de `APIService` et encapsulent les appels API pour un domaine métier.

**Exemples :**

```
src/features/properties/api/
├── properties.service.ts
└── properties.queries.ts

src/features/auth/api/
├── auth.service.ts
└── auth.queries.ts

src/core/api/
└── api.service.ts  # Classe abstraite de base
```

**Export :**

```typescript
// Classe + instance singleton
export class PropertiesService extends APIService {
  /* ... */
}
export const propertiesService = new PropertiesService();
```

**Import :**

```typescript
import { propertiesService } from "@/features/properties/api/properties.service";
```

**Règles :**

- ✅ Hérite de `APIService`
- ✅ Méthodes async qui retournent des Promises
- ✅ Documentation JSDoc complète
- ✅ Exporté comme singleton
- ❌ Pas de logique React (pas de hooks)

---

### ⚛️ **Queries (TanStack Query Hooks)**

**Pattern :** `<name>.queries.ts`

**Rôle :** Hooks TanStack Query qui encapsulent les appels API avec cache, loading, et error states.

**Exemples :**

```
src/features/properties/api/
└── properties.queries.ts

src/features/auth/api/
└── auth.queries.ts
```

**Export :**

```typescript
// Query keys + hooks
export const propertiesKeys = {
  /* ... */
};
export function useProperties(filters) {
  /* ... */
}
export function useProperty(id) {
  /* ... */
}
export function useCreateProperty() {
  /* ... */
}
```

**Import :**

```typescript
import {
  useProperties,
  useProperty,
} from "@/features/properties/api/properties.queries";
```

**Règles :**

- ✅ Utilise le service correspondant
- ✅ Définit les query keys (pour cache invalidation)
- ✅ Exports : `use<Action>` pour queries, `use<Action><Entity>` pour mutations
- ❌ Pas d'appels API directs (utiliser le service)

---

### 🗃️ **Stores (MobX State Management)**

**Pattern :** `<name>.store.ts`

**Rôle :** Classes MobX pour gérer le **client-side state** uniquement (UI, filters, etc.).

**Exemples :**

```
src/core/stores/
├── ui.store.ts
├── property-filters.store.ts
└── auth.store.ts

src/features/webhooks/stores/
└── webhook-form.store.ts
```

**Export :**

```typescript
// Classe + instance singleton
export class UIStore {
  /* ... */
}
export const uiStore = new UIStore();
```

**Import :**

```typescript
import { uiStore } from "@/core/stores/ui.store";
import { observer } from "mobx-react-lite";

// Usage dans un composant
export const MyComponent = observer(() => {
  return <div>{uiStore.isSidebarOpen}</div>;
});
```

**Règles :**

- ✅ **Client state UNIQUEMENT** (pas de server data)
- ✅ `makeObservable(this, { ... })` dans le constructor
- ✅ Exporté comme singleton
- ❌ Ne gère PAS les données serveur (utiliser TanStack Query)
- ❌ Ne fait PAS d'appels API (utiliser les services)

**⚠️ Important :** Les stores ne remplacent pas TanStack Query pour le server state.

---

### 📐 **Types (TypeScript Interfaces & Types)**

**Pattern :** `<name>.types.ts`

**Rôle :** Définitions TypeScript pour un domaine métier.

**Exemples :**

```
src/features/properties/types/
└── property.types.ts

src/features/auth/types/
└── auth.types.ts

src/core/types/
├── common.types.ts
└── api.types.ts
```

**Export :**

```typescript
// Interfaces, types, enums
export interface Property {
  /* ... */
}
export type PropertySummary = {
  /* ... */
};
export const PROPERTY_TYPE = {
  /* ... */
} as const;
export type PropertyType = (typeof PROPERTY_TYPE)[keyof typeof PROPERTY_TYPE];
```

**Import :**

```typescript
import type {
  Property,
  PropertyFilters,
} from "@/features/properties/types/property.types";
```

**Règles :**

- ✅ Grouper par domaine métier
- ✅ Utiliser `type` import pour les types purs
- ✅ Exporter les enums avec `as const` + type derived
- ✅ Interfaces pour les objets avec structures complexes
- ✅ Types pour les unions, intersections, utilitaires

---

### 🎨 **Composants (React Components)**

**Pattern :** `<Name>.tsx` (PascalCase, **pas de suffix**)

**Rôle :** Composants React réutilisables.

**Exemples :**

```
src/features/properties/components/
├── PropertyList.tsx
├── PropertyCard.tsx
└── PropertyDetail.tsx

src/core/ui/
├── button.tsx        # shadcn (lowercase)
├── card.tsx          # shadcn (lowercase)
└── badge.tsx         # shadcn (lowercase)
```

**Export :**

```typescript
// Named export (préféré) ou default export
export function PropertyCard({ property }) {
  /* ... */
}
// OU
export default function PropertyCard({ property }) {
  /* ... */
}
```

**Import :**

```typescript
import { PropertyCard } from "@/features/properties/components/PropertyCard";
```

**Règles :**

- ✅ **Pas de suffix** `.component.tsx` (redondant)
- ✅ PascalCase pour les composants features
- ⚠️ lowercase pour shadcn/ui (convention shadcn)
- ✅ Un composant par fichier (sauf composants helpers internes)
- ✅ Co-locate les sous-composants dans un dossier

---

### 🪝 **Custom Hooks**

**Pattern :** `use<Name>.ts`

**Rôle :** Hooks React custom réutilisables.

**Exemples :**

```
src/core/hooks/
├── useDebounce.ts
├── useLocalStorage.ts
└── useMediaQuery.ts

src/features/properties/hooks/
└── usePropertyShare.ts
```

**Export :**

```typescript
export function useDebounce<T>(value: T, delay: number): T {
  /* ... */
}
```

**Import :**

```typescript
import { useDebounce } from "@/core/hooks/useDebounce";
```

**Règles :**

- ✅ Préfixe `use` obligatoire (règle React)
- ✅ PascalCase après `use`
- ✅ Typé avec generics si applicable
- ❌ Ne pas mélanger avec les query hooks (utiliser `.queries.ts`)

---

### 🔧 **Utilitaires (Helper Functions)**

**Pattern :** `<name>.ts` ou `<name>.utils.ts`

**Rôle :** Fonctions helper pures (pas de React).

**Exemples :**

```
src/core/lib/
├── cn.ts              # Utilitaire TailwindCSS
├── format-date.ts     # Formatage dates
└── format-currency.ts # Formatage prix

src/core/utils/        # Alternative pour grouper
└── string.utils.ts
```

**Export :**

```typescript
export function formatCurrency(amount: number, locale = "fr-FR"): string {
  /* ... */
}
```

**Import :**

```typescript
import { formatCurrency } from "@/core/lib/format-currency";
```

**Règles :**

- ✅ Pure functions (pas d'effets de bord)
- ✅ kebab-case pour le nom de fichier
- ✅ Suffixe `.utils.ts` optionnel si regroupement thématique
- ❌ Pas de logique React

---

### 🎛️ **Configuration**

**Pattern :** `<name>.config.ts`

**Rôle :** Fichiers de configuration (pas de logique métier).

**Exemples :**

```
src/core/config/
├── env.ts            # Variables d'environnement
├── api.config.ts     # Configuration API
└── query-client.config.ts  # TanStack Query config
```

**Export :**

```typescript
export const apiConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
} as const;
```

**Import :**

```typescript
import { apiConfig } from "@/core/config/api.config";
```

**Règles :**

- ✅ Objets de configuration exportés avec `as const`
- ✅ Pas de logique complexe
- ✅ Valeurs dérivées de variables d'environnement

---

### 📦 **Constants**

**Pattern :** `<name>.constants.ts`

**Rôle :** Constantes réutilisables dans l'application.

**Exemples :**

```
src/core/constants/
├── routes.constants.ts
├── validation.constants.ts
└── messages.constants.ts
```

**Export :**

```typescript
export const ROUTES = {
  HOME: "/",
  PROPERTIES: "/properties",
  PROPERTY_DETAIL: (id: string) => `/properties/${id}`,
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED: "Ce champ est requis",
  EMAIL_INVALID: "Email invalide",
} as const;
```

**Import :**

```typescript
import { ROUTES } from "@/core/constants/routes.constants";
```

**Règles :**

- ✅ UPPER_SNAKE_CASE pour les noms de constantes
- ✅ Grouper par domaine
- ✅ Exporter avec `as const` pour type safety

---

## Structure d'organisation

### **Feature-based Structure**

```
src/
├── pages/                    # Routing layer (*.page.tsx)
├── features/                 # Business domains
│   └── <domain>/
│       ├── api/
│       │   ├── *.service.ts
│       │   └── *.queries.ts
│       ├── components/       # *.tsx (pas de suffix)
│       ├── hooks/            # use*.ts
│       ├── stores/           # *.store.ts
│       └── types/            # *.types.ts
├── core/                     # Shared/common
│   ├── api/
│   ├── ui/                   # shadcn components
│   ├── hooks/
│   ├── stores/
│   ├── lib/
│   ├── config/
│   └── constants/
└── app/                      # App setup
    ├── router/
    ├── providers/
    └── layouts/
```

---

## Index Barrels (Re-exports)

**Pattern :** `index.ts`

**Rôle :** Simplifier les imports en ré-exportant depuis un dossier.

**Exemple :**

```typescript
// features/properties/components/index.ts
export { PropertyList } from "./PropertyList";
export { PropertyCard } from "./PropertyCard";
export { PropertyDetail } from "./PropertyDetail";
```

**Usage :**

```typescript
// ✅ Import groupé
import { PropertyList, PropertyCard } from "@/features/properties/components";

// vs ❌ Imports multiples
import { PropertyList } from "@/features/properties/components/PropertyList";
import { PropertyCard } from "@/features/properties/components/PropertyCard";
```

**Règles :**

- ✅ Un `index.ts` par dossier de composants
- ✅ Re-exporter uniquement les exports publics
- ❌ Éviter les barrels trop larges (performance)

---

## Cas spéciaux

### **Tests**

**Pattern :** `<Name>.test.tsx` ou `<Name>.spec.tsx`

```
PropertyCard.test.tsx
properties.service.test.ts
```

### **Stories (Storybook)**

**Pattern :** `<Name>.stories.tsx`

```
PropertyCard.stories.tsx
Button.stories.tsx
```

### **Styles (si CSS Modules)**

**Pattern :** `<Name>.module.css`

```
PropertyCard.module.css
```

---

## Recherche par pattern

### **Trouver tous les fichiers d'un type**

```bash
# Pages
find src/pages -name "*.page.tsx"

# Services
find src/features -name "*.service.ts"

# Queries
find src/features -name "*.queries.ts"

# Stores
find src -name "*.store.ts"

# Types
find src -name "*.types.ts"

# Composants (exclut pages, tests, stories)
find src/features -name "*.tsx" ! -name "*.page.tsx" ! -name "*.test.tsx" ! -name "*.stories.tsx"
```

---

## Migration depuis d'autres conventions

### **De `<Name>Page.tsx` vers `<Name>.page.tsx`**

```bash
# Renommer en masse
find src/pages -name "*Page.tsx" -exec rename 's/Page\.tsx$/.page.tsx/' {} \;
```

### **Mettre à jour les imports**

```bash
# Rechercher tous les imports de pages
grep -r "from '@/pages" src/
```

---

## Références

- **Inspiration :** Angular File Structure
- **Pattern :** Suffix-based categorization
- **Philosophie :** Domain-Driven Design (DDD)

---

## Exceptions

### **Quand ne PAS utiliser le suffix**

1. **Composants standards** : `PropertyCard.tsx` (pas `.component.tsx`)
2. **shadcn/ui** : `button.tsx` (convention shadcn)
3. **Fichiers uniques** : `App.tsx`, `main.tsx`
4. **Config racine** : `vite.config.ts`, `tailwind.config.ts`

---

## Résumé visuel

```
<Name>.<type>.<ext>
  │      │      │
  │      │      └─ Extension (.ts, .tsx, .md)
  │      └─ Type/Rôle (page, service, queries, store, types)
  └─ Nom de base (PascalCase pour composants/pages, kebab-case pour utils)
```

**Exemples complets :**

```
Properties.page.tsx        → Page de listing
properties.service.ts      → Service API
properties.queries.ts      → Hooks TanStack Query
property-filters.store.ts  → Store MobX
property.types.ts          → Types TypeScript
PropertyCard.tsx           → Composant React
usePropertyShare.ts        → Hook custom
format-currency.ts         → Utilitaire
api.config.ts              → Configuration
routes.constants.ts        → Constantes
```
