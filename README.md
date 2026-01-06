# Expense Tracker App

A modern React Native expense tracking application built with Expo and following Feature-Sliced Design (FSD) architecture. Features Firebase authentication with secure token management and automatic token refresh.

## 🚀 Tech Stack

### Core

- **React Native 0.81** - Cross-platform mobile framework
- **React 19** - UI library
- **Expo 54** - Development platform and toolchain
- **TypeScript 5.9** - Type-safe JavaScript

### Authentication & Security

- **Firebase Auth** - User authentication (login, registration)
- **Expo Secure Store** - Encrypted token storage
- **Automatic Token Refresh** - Seamless session management with request queuing

### State Management & Data

- **Zustand 5** - Lightweight state management with Immer middleware
- **Axios** - HTTP client with interceptors for auth
- **Zod** - Schema validation for forms

### Navigation

- **React Navigation 7** - Native stack and bottom tab navigation with auth guards

### Utilities

- **Remeda** - Functional programming utilities
- **Immer** - Immutable state updates

### Code Quality

- **ESLint 9** - Linting with FSD boundaries enforcement
- **Prettier** - Code formatting

## ✨ Features

### Authentication

- Email/password registration and login
- Automatic session persistence with secure token storage
- Token refresh with request queuing (no failed requests during refresh)
- Protected routes with auth guards

### Expense Management

- Create, edit, and delete expenses
- View all expenses or filter by recent (last 7 days)
- Expense summary with total calculation
- Form validation with Zod schemas

## 📁 Project Structure

This project follows the Feature-Sliced Design (FSD) architecture:

```
src/
├── app/                    # Application initialization
│   ├── navigation/         # Navigation configuration
│   │   ├── lib/            # Stack and tab definitions
│   │   └── ui/             # Navigator components
│   │       ├── AuthNavigator.tsx      # Auth guard navigator
│   │       ├── BottomTabNavigator.tsx # Main tab navigation
│   │       └── RootStackNavigator.tsx # Root stack
│   └── providers/          # App providers (Router)
│
├── screens/                # Full-screen views (pages layer)
│   ├── all-expenses/       # All expenses list screen
│   ├── login/              # Login screen
│   ├── manage-expense/     # Add/Edit expense modal screen
│   ├── recent-expenses/    # Recent (7 days) expenses screen
│   └── registration/       # Registration screen
│
├── widgets/                # Complex UI compositions
│   ├── auth-layout/        # Auth screens layout (header, footer, wrapper)
│   └── expenses-output/    # Expenses list with summary widget
│
├── features/               # User interactions
│   ├── add-expense/        # Add expense button
│   ├── delete-expense/     # Delete expense functionality
│   ├── login/              # Login form functionality
│   │   ├── api/            # Login API call
│   │   ├── model/          # useLoginForm hook, types
│   │   └── ui/             # Login form component
│   ├── logout/             # Logout functionality
│   │   ├── api/            # Logout API call
│   │   └── ui/             # Logout button
│   ├── manage-expense/     # Expense form and actions
│   │   ├── lib/            # Form utilities
│   │   ├── model/          # Form state management
│   │   └── ui/             # Form components
│   └── registration/       # Registration form functionality
│       ├── api/            # Registration API call
│       ├── model/          # useRegistrationForm hook, types
│       └── ui/             # Registration form component
│
├── entities/               # Business entities
│   ├── user/               # User entity (authenticated user data)
│   │   ├── api/            # User API calls (getCurrentUser)
│   │   └── model/          # User store, types, useInitializeUser
│   └── expense/
│       ├── api/            # Expense API calls
│       ├── lib/            # Mappers, utils, constants
│       ├── model/          # Store, types, hooks
│       └── ui/             # Entity UI (list, summary)
│
└── shared/                 # Reusable infrastructure
    ├── api/                # API infrastructure
    │   ├── auth/           # Auth utilities
    │   │   ├── handlers-registry.ts  # Auth handlers registry (IoC)
    │   │   ├── token-refresh.ts      # Token refresh logic
    │   │   ├── store-auth-tokens.ts  # Token storage helper
    │   │   ├── map-firebase-user.ts  # Firebase user mapper
    │   │   └── types.ts              # Auth types (credentials, responses)
    │   ├── clients/        # API clients
    │   │   ├── api-client.ts       # Main Axios client
    │   │   └── auth-client/        # Firebase auth client
    │   └── interceptors/   # Axios interceptors
    │       ├── request/    # Auth request interceptor
    │       └── response/   # Token refresh interceptor with queue
    ├── config/             # Theme configuration
    │   └── theme/          # Colors, spacing, fonts
    ├── hooks/              # Shared hooks
    ├── routes/             # Navigation types and hooks
    ├── secure-storage/     # Encrypted token storage
    ├── ui/                 # Shared UI components
    │   ├── amount-input/   # Currency input with validation
    │   ├── button/         # Button variants
    │   ├── card/           # Card container
    │   ├── date-input/     # Date picker input
    │   ├── description-input/
    │   ├── dismiss-keyboard/
    │   ├── email-input/    # Email input with validation
    │   ├── error-overlay/  # Error state overlay
    │   ├── icon-button/    # Icon button
    │   ├── input/          # Base text input
    │   ├── loading-overlay/# Loading state overlay
    │   ├── password-input/ # Password input with validation
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
- Custom hooks for store access (`useExpenses`, `useExpenseById`, `useUser`, `useIsAuthenticated`, etc.)
- Async operations with abort controller support

### Authentication Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    AuthNavigator                             │
│  (Guards protected routes, shows login/register if needed)   │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│              User Entity + Auth Features                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  User Store │  │  Login/     │  │  Auth Handlers      │  │
│  │  (Zustand)  │  │  Register   │  │  Setup (app layer)  │  │
│  └─────────────┘  │  Features   │  └─────────────────────┘  │
│                   └─────────────┘                            │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                 Shared Auth Infrastructure                   │
│  ┌──────────────────┐  ┌────────────────────────────────┐   │
│  │  Token Storage   │  │  Auth Handlers Registry (IoC)  │   │
│  │  (SecureStore)   │  │  (refreshToken, resetAuth)     │   │
│  └──────────────────┘  └────────────────────────────────┘   │
│  ┌──────────────────┐  ┌────────────────────────────────┐   │
│  │  Auth Client     │  │  Interceptors                  │   │
│  │  (Firebase API)  │  │  (Auth + Token Refresh)        │   │
│  └──────────────────┘  └────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**

- **Automatic Token Refresh** - 401 responses trigger token refresh with request queuing
- **Secure Storage** - Tokens stored encrypted via `expo-secure-store`
- **Auth Guards** - Navigation protected by `AuthNavigator`
- **Registry Pattern** - Decoupled auth handlers for interceptors

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
EXPO_PUBLIC_FIREBASE_BACKEND_URL=your_firebase_realtime_database_url
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_web_api_key
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
