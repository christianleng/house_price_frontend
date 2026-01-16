# House Price 🏠

A comprehensive house price platform built with modern web technologies, demonstrating full-stack engineering principles, scalable architecture, and performance optimization strategies for the French property market.

> **Note:** This project serves as both a learning exercise in full-stack development and a portfolio piece showcasing engineering methodology—not just feature implementation.

---

## 📚 Learning Resources

- [Design System Documentation](src/core/config/design-tokens.md)
- [Naming Conventions Guide](src/core/config/naming-conventions.md)
- 🔥 [Performance Guide - Render as you fetch](src/core/config/case-study-render-as-you-fetch.md)

---

## 🎯 Project Vision

House Price reimagines house price discovery by combining intuitive property browsing with machine learning-driven insights. The platform draws architectural inspiration from established players (SeLoger, Compass, Sotheby's) while adapting proven patterns for local market needs.

The project demonstrates engineering thinking through:

- **Systematic problem-solving** over quick implementations
- **Architectural decisions** that scale and maintain themselves
- **Performance optimization** as a design principle, not an afterthought
- **Type safety and modularity** throughout the stack

---

## 🏗️ Architecture & Design Decisions

### Frontend Architecture: Feature-Based Organization

The codebase uses **domain-driven feature structure** rather than technical layer separation. This approach directly addresses three critical problems:

1. **Faster Product Iteration**: Business logic lives together, reducing cross-file navigation
2. **Regression Prevention**: Feature modifications are scoped to feature directories
3. **Reduced Evolution Cost**: Adding new features doesn't require touching established layers

```
src/features/properties/          # Self-contained business domain
  ├── api/                        # Queries, mutations, service layer
  ├── components/                 # Domain-specific UI (not cross-feature)
  ├── hooks/                      # Feature-scoped logic
  └── types/                      # Domain models
```

**Design principle**: Reusable, truly generic components live in `core/ui/`. Domain-specific components stay in their feature. This prevents coupling and keeps the shared layer lightweight.

### Design System: Tokens-First Approach

Instead of magic numbers scattered through stylesheets, the project implements a **comprehensive Design Token system** built on OKLCH color space for perceptually accurate colors:

- **Color tokens** with semantic naming (primary, secondary, semantic states)
- **Typography scale** with responsive font sizes
- **Spacing system** with consistent intervals
- **Responsive breakpoints** in Tailwind configuration

```typescript
// Token-based design ensures consistency and makes rebrand effortless
const colors = {
  primary: "oklch(50% 0.2 200)", // Perceptually accurate
  semantic: {
    success: "oklch(65% 0.25 142)", // Named by intent, not hex
    error: "oklch(55% 0.25 25)",
  },
};
```

**Benefit**: Changing colors or spacing doesn't require hunting through stylesheets—one token change updates the entire platform.

### Asynchronous State Management: TanStack Query

Server state (API data) and client state are deliberately separated:

- **TanStack Query**: Handles caching, refetching, loading/error states
- **Mobx stores**: Client-only state (UI toggles, filters, user preferences)

This separation prevents the complexity that comes from mixing server and client state patterns.

```typescript
// Example: Efficient property fetching with built-in cache invalidation
export const usePropertiesQuery = (filters: PropertyFilters) => {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: () => propertiesService.getByFilters(filters),
  });
};

// Automatic cache management, retry logic, background refetching
```

**Why this matters**: TanStack Query eliminates entire classes of bugs around stale data, loading states, and race conditions.

---

## ⚡ Performance Optimizations

### 1. Cursor-Based Pagination (Infinite Scroll)

Implements **offset-free pagination** to prevent the N+1 problem and maintain position accuracy even as data updates.

```typescript
// Instead of offset-based: page 1-20, page 21-40...
// Uses cursor to bookmark position: queryKey: ['properties', { cursor: 'property_123' }]
```

**Trade-off**: Slightly more complex backend logic, but eliminates common pagination bugs and scales naturally with large datasets.

### 2. Responsive Image Strategy

Images are processed with multiple sizes and modern formats (WebP) before storage:

- **Automatic conversion** via Pillow in the backend
- **Srcset generation** for responsive loading
- **Format negotiation** (WebP for modern browsers, fallback JPEG)

```typescript
// Browser automatically selects optimal image
<img
  src={property.photo.url.medium}
  srcSet={property.photo.srcset}
  sizes="(max-width: 768px) 100vw, 50vw"
  alt={property.title}
/>
```

**Impact**: 60-70% reduction in bandwidth for image-heavy pages like property listings.

### 3. Code Splitting & Lazy Loading

Routes are lazy-loaded via React.lazy(), CSS is tree-shaken with Tailwind, and bundles are analyzed for unnecessary dependencies.

```typescript
const PropertiesPage = lazy(() => import("@/pages/Properties.page"));

// Bundle size: only code needed for this route loads
```

---

## 🔐 Backend Foundation

The backend provides a solid, extensible foundation:

- **JWT authentication** with refresh token rotation
- **Role-based access control** (user, agent, admin)
- **Comprehensive property management**: listings, photos, metadata
- **Automated database seeding** with realistic test data across French cities
- **Proper relationship modeling**: agents → properties → photos

```typescript
// Example: Agent model with relationships
class Agent(Base):
    __tablename__ = "agents"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    properties: Mapped[List[Property]] = relationship("Property", back_populates="agent")

    # RBAC built into the model layer
    def can_edit_property(self, property: Property) -> bool:
        return property.agent_id == self.id
```

---

## 📊 Tech Stack

| Layer                | Technology                  | Why                                                          |
| -------------------- | --------------------------- | ------------------------------------------------------------ |
| **Frontend**         | React 19 + TypeScript       | Type safety, latest features, ecosystem maturity             |
| **State**            | TanStack Query + Mobx       | Separation of concerns, automatic cache management           |
| **Styling**          | Tailwind CSS v4 + shadcn/ui | Utility-first, design tokens, composable components          |
| **Form Handling**    | React Hook Form             | Minimal re-renders, excellent TypeScript support             |
| **Backend**          | FastAPI + SQLAlchemy        | Fast async performance, automatic OpenAPI docs, ORM elegance |
| **Database**         | PostgreSQL                  | ACID compliance, JSON support, relational integrity          |
| **Image Processing** | Pillow                      | Automatic optimization, responsive image generation          |
| **Carousel**         | Embla Carousel              | Lightweight, performant, accessibility-first                 |
| **Deployment**       | Docker Compose              | Reproducible environments, single-command setup              |

**Philosophy**: Prefer native solutions and lightweight frameworks over heavy abstractions. Each dependency carries maintenance cost.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- Docker & Docker Compose
- PostgreSQL 14+ (if running without Docker)

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/house-price.git
cd house-price

# Frontend
cd client
npm install
npm run dev          # Development server on http://localhost:5173

# Backend (in separate terminal)
cd api
pip install -r requirements.txt
python -m uvicorn main:app --reload

# Or with Docker
docker-compose up
```

---

## 📁 Project Structure

```
src/
├── app/                          # Application core
│   ├── layouts/                  # Reusable layouts
│   ├── providers/                # Global providers
│   └── router/                   # Route configuration
│
├── core/                         # Shared across ALL features
│   ├── api/                      # API client, interceptors, error handling
│   ├── config/                   # Environment, design tokens
│   ├── hooks/                    # Shared custom hooks
│   ├── lib/                      # Utilities & helpers
│   ├── stores/                   # Mobx client state
│   ├── types/                    # TypeScript definitions
│   └── ui/                       # shadcn/ui components (base layer only)
│
├── features/                     # Domain-driven modules
│   ├── properties/               # Self-contained: queries, components, types
│   ├── agents/
│   ├── auth/
│   └── photos/
│
└── pages/                        # Thin page components (routing layer)
```

**Key principle**: Each feature is independently testable and deployable. Shared code lives in `core/`. Domain-specific code stays in features.

---

## 🎨 Design System

The project uses a **token-based design approach** with Tailwind CSS v4:

### Color System (OKLCH)

- **Primary colors**: Semantic naming (primary, secondary, accent)
- **State colors**: Success, warning, error, info
- **Semantic tokens**: Background, surface, text

### Typography Scale

Responsive font sizes that scale across breakpoints:

- Heading sizes: h1–h6
- Body text: body, caption, label
- Monospace: code snippets

### Spacing System

Consistent intervals based on 4px baseline:

- Padding/margin utilities
- Gap values for layouts
- Component internal spacing

See [`src/core/config/design-tokens.md`](src/core/config/design-tokens.md) for complete token reference.

---

## 🔄 Development Workflow

### Git Conventions (Conventional Commits)

```bash
feat(properties): add advanced price range filter
fix(api): handle 401 errors with token refresh
refactor(auth): simplify JWT refresh logic
docs(readme): update architecture section
chore(deps): upgrade react to v19
```

Structured commits make history readable and enable automated changelog generation.

### API Error Handling

Centralized error handling with `ApiError` class:

```typescript
// Consistent error responses across all endpoints
try {
  const data = await api.get("/properties");
} catch (error) {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      // Handle token refresh
    } else if (error.status === 404) {
      // Handle not found
    }
  }
}
```

### Code Quality

- **TypeScript strict mode**: Catches errors at compile time
- **ESLint & Prettier**: Consistent formatting
- **No `any` types**: Forces proper typing
- **Responsive design first**: All components mobile-ready

---

## 📄 License

MIT License - see LICENSE file for details.

---

## 👨‍💻 Author

Built by Christian.L as a demonstration of full-stack engineering principles and architectural thinking.

**Key focus areas:**

- Clean, maintainable code architecture
- Performance optimization strategies
- Type-safe TypeScript patterns
- Scalable feature organization
- Systematic problem-solving approach

---

**Last Updated**: January 2026 | **Status**: Active Development
