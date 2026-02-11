# Storybook

## 📚 Ressources d'Apprentissage & Case Studies

### Ressources Générales

- [README.md](../../../README.md)
- [Documentation du Design System](./design-tokens.md)
- [Documentation Storybook](./storybook.md)
- [Guide des Conventions de Nommage](./naming-conventions.md)

## Guide du Design System - House Price

Ce document définit les conventions et les solutions techniques pour le Storybook du projet. L'objectif est de maintenir une documentation visuelle robuste tout en respectant les contraintes strictes de notre stack (React 19, Tailwind 4, TypeScript 5.8+).

## Organisation des Dossiers

Pour une navigation intuitive, les composants sont séparés en deux catégories distinctes :

### `UI/` : Composants Atomiques

Les composants atomiques et agnostiques. Ils ne connaissent pas le métier de l'immobilier.

**Exemples :** `Button`, `Input`, `Badge`, `Checkbox`

### `DOMAIN/` : Composants Métier

Les composants métier. Ils sont spécifiques à l'immobilier et manipulent nos types de données.

**Exemples :** `PropertyCard`, `EnergyPerformance`, `PriceDisplay`

## 🚀 Workflow de Création

1. Créer le fichier `MonComposant.stories.tsx`
2. Définir un `mockData` robuste en respectant les types
3. Créer une story `Default` pour la documentation automatique
4. Ajouter des stories pour les cas limites (titres trop longs, images manquantes, états d'erreur)
