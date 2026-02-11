# Case Study: Architecture Data-Driven & Suppression du Waterfall

## 📚 Ressources d'Apprentissage & Case Studies

### Ressources Générales

- [README.md](../../../README.md)
- [Documentation du Design System](./design-tokens.md)
- [Documentation Storybook](./storybook.md)
- [Guide des Conventions de Nommage](./naming-conventions.md)

## Case Study: Optimisation du Cycle de Rendu (162ms → < 50ms)

### Le Problème

Au chargement de la HomePage, une Long Task de 162ms bloquait le thread principal. L'utilisateur subissait un effet de "pop-in" désagréable : un spinner central, puis des skeletons, puis enfin les données. Les images du premier carrousel (LCP) arrivaient avec un retard important.

### Le Diagnostic (DevTools Long task ↑ 162 ms)

Timeline d'exécution initiale (Fetch-on-render) :

```
0ms    - Navigation démarre
50ms   - Suspense global s'active (fallback: PageLoader)
150ms  - JS de HomePage chargé (Lazy import)
200ms  - RootLayout + HomePage montent
210ms  - ⚠️ FETCH DÉMARRE: useProperties() appelle l'API
350ms  - API répond (sale, rent, by-cities)
360ms  - ⚠️ LONG TASK (162ms): React rend 30 cartes d'un coup
522ms  - Données affichées + décodage images
```

Symptômes visibles dans DevTools :

- Network Tab : Waterfall classique. Les requêtes API ne partent qu'après l'exécution du JS de la page.
- Performance Tab : "Waiting on main thread" de 187ms sur l'appel API.
- Lighthouse : CLS élevé dû au chargement lazy de la barre de recherche et du header.

### La Racine du Problème : Le Pattern "Fetch-on-render"

L'application attendait que React monte les composants pour savoir quelles données chercher.

```typescript
// ❌ PROBLÉMATIQUE: Fetch-on-render
function PropertyCarouselSection() {
  const { data } = useProperties(filters); // ← Ne s'exécute qu'au montage!
  // ...
}
```

Pourquoi c'était le problème :

- Séquentialité : Téléchargement du code JS $\rightarrow$ Exécution $\rightarrow$ Rendu $\rightarrow$ Appel API.
- Suspense Bloquant : Le Suspense au niveau des routes empêchait de voir le "Shell" (Header) immédiatement.
- Instabilité Visuelle : La SearchBar en lazy déplaçait tout le contenu au montage (CLS).

### La Solution : Render-as-you-fetch & Loaders

Nous avons migré vers le Data Router de React Router v7 pour paralléliser le chargement du code et des données.

```typescript
// ✅ OPTIMISÉ: Render-as-you-fetch (routes.tsx)
export const routes = [
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage, // Import statique (pas de lazy!)
        loader: async () => {
          // Démarre le fetch AVANT même que le composant ne soit monté
          await queryClient.prefetchQuery({
            queryKey: propertiesKeys.list(SALE_FILTERS),
            queryFn: () => propertiesService.getProperties(SALE_FILTERS),
            staleTime: 60000,
          });
          return null;
        },
      },
    ],
  },
];
```

### Résultats

Timeline optimisée :

```
0ms    - Navigation démarre
2ms    - 🚀 LOADER DÉCLENCHÉ: prefetchQuery lance les appels API
10ms   - RootLayout + Shell montent immédiatement (Statique) ✅
12ms   - Header + SearchBar visibles (CLS = 0)
150ms  - API répond (la donnée est déjà en cache)
155ms  - HomePage affiche les données instantanément ✅
Total: Réduction drastique de la perception de chargement
```

Avant/Après (mesuré avec Lighthouse) :

| Métrique               | Avant | Après  | Amélioration |
| ---------------------- | ----- | ------ | ------------ |
| Waiting on main thread | 187ms | < 50ms | -73%         |
| CLS (Layout Shift)     | 0.150 | 0      | -100%        |
| LCP (Priority Images)  | 1.2s  | 0.7s   | -41%         |
| Perceived Performance  | Low   | High   | Instant      |

## Concepts Clés Appris

### 1. Fetch-on-render vs Render-as-you-fetch

- **Fetch-on-render**: Le composant décide du fetch (lent, waterfall).
- **Render-as-you-fetch**: Le routeur anticipe le fetch (rapide, parallèle).

### 2. HydrateFallback vs PageLoader

- **PageLoader** (Spinner central): Bloque l'immersion utilisateur.
- **HydrateFallback**: Utilise des skeletons pour stabiliser le "First Paint".

### 3. L'importance du Bundle Critique

- Ne jamais mettre en lazy les éléments du haut de page (Header, SearchBar).
- Utiliser fetchPriority="high" pour les actifs visibles dès le chargement (Above the fold).

## Processus de Debugging Qui a Mené à la Solution

### Étape 1 : Identifier le goulot d'étranglement

- DevTools montrait un long "Waiting on main thread" sur les requêtes API.
- Analyse : Le JS était prêt bien avant que l'API ne soit sollicitée.

### Étape 2 : Analyser les flashs visuels

- Observation : Passage Spinner $\rightarrow$ Skeletons $\rightarrow$ Contenu.
- Cause : Suspense trop haut dans l'arbre des routes.

### Étape 3 : Implémenter le Data Router

- Migration vers createBrowserRouter et RouterProvider.
- Liaison du queryClient global avec les loaders du routeur.

## Leçons pour le Futur

✅ **Anticiper la donnée au plus haut niveau**
Les loaders sont le meilleur endroit pour lancer les requêtes.

✅ **Protéger le CLS à tout prix**
Préférer un import statique pour le Layout et le Header.

✅ **Utiliser le cache de manière agressive**
prefetchQuery avec un staleTime cohérent élimine les doubles requêtes au montage.
