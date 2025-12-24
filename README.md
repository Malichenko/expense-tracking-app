# Expense Tracker App

A modern React Native expense tracking application built with Expo and following Feature-Sliced Design (FSD) architecture.

## 🚀 Tech Stack

### Core

- **React Native 0.81** - Cross-platform mobile framework
- **React 19** - UI library
- **Expo 54** - Development platform and toolchain
- **TypeScript 5.9** - Type-safe JavaScript

### State Management & Data

- **Zustand 5** - Lightweight state management with Immer middleware
- **Axios** - HTTP client for API communication
- **Zod** - Schema validation for forms

### Navigation

- **React Navigation 7** - Native stack and bottom tab navigation

### Utilities

- **Remeda** - Functional programming utilities
- **Immer** - Immutable state updates

### Code Quality

- **ESLint 9** - Linting with FSD boundaries enforcement
- **Prettier** - Code formatting

## 📁 Project Structure

This project follows the Feature-Sliced Design (FSD) architecture:

```
src/
├── app/                    # Application initialization
│   ├── navigation/         # Navigation configuration
│   │   ├── lib/            # Stack and tab definitions
│   │   └── ui/             # Navigator components
│   └── providers/          # App providers (Router)
│
├── screens/                # Full-screen views (pages layer)
│   ├── all-expenses/       # All expenses list screen
│   ├── manage-expense/     # Add/Edit expense modal screen
│   └── recent-expenses/    # Recent (7 days) expenses screen
│
├── widgets/                # Complex UI compositions
│   └── expenses-output/    # Expenses list with summary widget
│
├── features/               # User interactions
│   ├── add-expense/        # Add expense button
│   ├── delete-expense/     # Delete expense functionality
│   └── manage-expense/     # Expense form and actions
│       ├── lib/            # Form utilities
│       ├── model/          # Form state management
│       └── ui/             # Form components
│
├── entities/               # Business entities
│   └── expense/
│       ├── api/            # Expense API calls
│       ├── lib/            # Mappers, utils, constants
│       ├── model/          # Store, types, hooks
│       └── ui/             # Entity UI (list, summary)
│
└── shared/                 # Reusable infrastructure
    ├── api/                # API client (Axios)
    ├── config/             # Theme configuration
    │   └── theme/          # Colors, spacing, fonts
    ├── lib/                # Shared hooks
    │   └── hooks/          # useAbortController, etc.
    ├── routes/             # Navigation types and hooks
    ├── store/              # App-level store
    ├── ui/                 # Shared UI components
    │   ├── amount-input/   # Currency input with validation
    │   ├── button/         # Button variants
    │   ├── card/           # Card container
    │   ├── date-input/     # Date picker input
    │   ├── description-input/
    │   ├── dismiss-keyboard/
    │   ├── error-overlay/  # Error state overlay
    │   ├── icon-button/    # Icon button
    │   ├── input/          # Base text input
    │   ├── loading-overlay/# Loading state overlay
    │   └── screen-layout/  # Screen wrapper
    └── utils/              # Utility functions
        ├── alert/          # Error alert helper
        ├── currency/       # Currency formatting
        ├── date/           # Date formatting
        └── fp/             # Functional programming helpers
```

## 🏗️ Architecture Principles

### FSD Layer Hierarchy

```
app → screens → widgets → features → entities → shared
```

Each layer can only import from layers below it.

### Slice Structure

Each slice (feature, entity, etc.) follows this internal structure:

```
slice/
├── index.ts      # Public API (facade)
├── api/          # API calls
├── lib/          # Utilities, constants, helpers
├── model/        # State, types, hooks
└── ui/           # UI components
```

### Import Rules

1. **Use path aliases** for cross-layer imports:

   ```typescript
   import { Button } from "@shared/ui";
   import { useExpenses } from "@entities/expense";
   ```

2. **Import from facades only** (index.ts):

   ```typescript
   // ✅ Correct
   import { Expense } from "@entities/expense";

   // ❌ Wrong - deep import
   import { Expense } from "@entities/expense/model/types";
   ```

3. **Use relative imports within a slice**:

   ```typescript
   // Inside @entities/expense/model/store.ts
   import type { Expense } from "./types";
   import { sortExpensesByDateDescending } from "../lib/utils/sortExpensesByDateDescending";
   ```

4. **Entities cannot import from other entities** - enforced by ESLint

### State Management Pattern

- **Zustand** stores with **Immer** middleware for immutable updates
- Selectors for derived data
- Custom hooks for store access (`useExpenses`, `useExpenseById`, etc.)
- Async operations with abort controller support

## 🎨 Theme

Custom design tokens in `src/shared/config/theme/`:

| Token               | Purpose                          |
| ------------------- | -------------------------------- |
| `palette.primary`   | Purple shades - main brand color |
| `palette.secondary` | Blue shades - secondary actions  |
| `palette.accent`    | Orange/gold - highlights         |
| `palette.error`     | Red shades - errors/destructive  |
| `palette.neutral`   | Grayscale - text/backgrounds     |
| `spacing`           | Consistent spacing scale (x1-x8) |
| `fontSize`          | Typography scale                 |

## 🛠️ Setup

### Prerequisites

- Node.js v20.19.0, v22.13.0, or >=24
- npm or yarn
- iOS Simulator / Android Emulator (or physical device)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file with:

```env
EXPO_PUBLIC_FIREBASE_BACKEND_URL=your_firebase_url
```

### Running the App

```bash
# Start Expo development server
npm start

# Platform-specific
npm run android
npm run ios
npm run web
```

## 📝 Available Scripts

| Script                 | Description              |
| ---------------------- | ------------------------ |
| `npm start`            | Start Expo dev server    |
| `npm run android`      | Run on Android           |
| `npm run ios`          | Run on iOS               |
| `npm run web`          | Run on web               |
| `npm run lint`         | Run ESLint               |
| `npm run lint:fix`     | Auto-fix ESLint errors   |
| `npm run type-check`   | TypeScript type checking |
| `npm run format`       | Format with Prettier     |
| `npm run format:check` | Check formatting         |

## 📦 Path Aliases

| Alias         | Path             |
| ------------- | ---------------- |
| `@app/*`      | `src/app/*`      |
| `@screens/*`  | `src/screens/*`  |
| `@widgets/*`  | `src/widgets/*`  |
| `@features/*` | `src/features/*` |
| `@entities/*` | `src/entities/*` |
| `@shared/*`   | `src/shared/*`   |

## 🔍 Code Quality

### ESLint Configuration

- **FSD Boundaries** - Enforces layer import rules
- **TypeScript** - Strict type checking rules
- **React Hooks** - Rules of hooks enforcement
- **Prettier** - Integrated formatting
- **Entity Isolation** - Prevents cross-entity imports

### TypeScript Guidelines

- ❌ Never use `any` type
- ✅ Use generics for flexible typing
- ❌ Avoid type casting (`as`)
- ✅ Enable strict mode

## 📄 License

Private project
