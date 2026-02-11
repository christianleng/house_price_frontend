# House Price Design System - Design Tokens

## 📚 Ressources d'Apprentissage & Case Studies

### Ressources Générales

- [README.md](../../../README.md)
- [Guide des Conventions de Nommage](./naming-conventions.md)
- [Documentation Storybook](./storybook.md)
- 🔥 [Performance Guide - Render as you fetch](./case-study-render-as-you-fetch.md)

## 🎨 Colors

### Brand Colors

- **Primary**: Teal/Turquoise (immobilier, confiance)
  - `--primary`: oklch(0.6 0.13 163)
  - Usage: CTA, liens, éléments interactifs principaux

- **Secondary**: Light gray
  - `--secondary`: oklch(0.967 0.001 286.375)
  - Usage: Boutons secondaires, backgrounds subtils

### Semantic Colors

- **Success**: Green - Opérations réussies, statuts positifs
- **Warning**: Orange - Avertissements, actions à confirmer
- **Info**: Blue - Informations neutres, tips
- **Destructive**: Red - Erreurs, suppressions

### Neutral Scale (Gray)

Échelle complète de 50 à 950 pour textes, borders, backgrounds.

## 📐 Typography

### Font Sizes

- **xs**: 12px - Labels, metadata
- **sm**: 14px - Body small, captions
- **base**: 16px - Body text (défaut)
- **lg**: 18px - Emphasized text
- **xl**: 20px - Small headings
- **2xl**: 24px - Section headings
- **3xl**: 30px - Page headings
- **4xl**: 36px - Hero headings
- **5xl**: 48px - Large hero text

### Font Weights

- **normal** (400): Body text
- **medium** (500): Emphasized text
- **semibold** (600): Headings, buttons
- **bold** (700): Strong emphasis

## 📏 Spacing

Échelle basée sur 4px (0.25rem) de 0 à 96 (384px).

**Usage courant**:

- `gap-2` (8px): Entre éléments proches (icon + text)
- `gap-4` (16px): Entre éléments dans un groupe
- `gap-6` (24px): Entre sections d'un même composant
- `gap-8` (32px): Entre composants différents
- `p-4` (16px): Padding défaut de cards/sections
- `p-6` (24px): Padding large de containers

## 🎭 Shadows

Système d'élévation à 6 niveaux:

- **xs**: Hover state subtil
- **sm**: Petits éléments (badges, chips)
- **md**: Cards, list items (défaut)
- **lg**: Dropdowns, popovers
- **xl**: Modals, overlays
- **2xl**: Très grande profondeur (splash screens)

## ⏱️ Animations

### Durations

- **fast** (150ms): Micro-interactions (hover, focus)
- **base** (250ms): Transitions standard (défaut)
- **slow** (350ms): Animations complexes
- **slower** (500ms): Animations dramatiques

### Easings

- **ease-in**: Accélère (sortie d'écran)
- **ease-out**: Ralentit (entrée d'écran) - défaut
- **ease-in-out**: Symétrique (aller-retour)
- **ease-bounce**: Rebond ludique

## 📱 Breakpoints

- **sm**: 640px (Mobile large / Tablet small)
- **md**: 768px (Tablet)
- **lg**: 1024px (Desktop)
- **xl**: 1280px (Large desktop)
- **2xl**: 1536px (Extra large)
