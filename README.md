# Expense Tracker App

A modern React Native expense tracking application built with Expo and following Feature-Sliced Design (FSD) architecture.

## 🚀 Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and toolchain
- **TypeScript** - Type-safe JavaScript
- **Feature-Sliced Design** - Scalable architecture methodology
- **ESLint 9** - Code linting with FSD boundaries enforcement
- **Prettier** - Code formatting

## 📁 Project Structure

This project follows the Feature-Sliced Design (FSD) architecture:

```
src/
├── app/          # Application initialization and providers
├── screens/      # Full-screen views (pages)
├── widgets/      # Complex UI blocks composed of features
├── features/     # User interactions and business features
├── entities/     # Business entities (models, data)
└── shared/       # Reusable code
    ├── ui/       # Shared UI components
    ├── lib/      # Shared utilities
    ├── assets/   # Shared assets
    └── config/   # Shared configuration (theme, etc.)
```

### Architecture Rules

- **Layer Hierarchy**: `app` → `screens` → `widgets` → `features` → `entities` → `shared`
- **Import Rules**:
  - Use path aliases (`@app/*`, `@screens/*`, etc.)
  - Import from `index.ts` facades only
  - No deep imports across layers
- **Boundaries**: ESLint enforces layer boundaries automatically

## 🎨 Theme

The app uses a custom color palette with:

- **Primary**: Purple shades (`#7c4aff` main)
- **Secondary**: Vibrant blue shades (`#0099e6` main)
- **Danger**: Red shades for errors/warnings
- **Accent**: Orange/gold shades for highlights
- **Neutral**: Grayscale for text and backgrounds

See `src/shared/config/theme/colors.ts` for the complete palette.

## 🛠️ Setup

### Prerequisites

- Node.js (v20.19.0, v22.13.0, or >=24)
- npm or yarn
- Expo CLI (optional, included in dependencies)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

### Available Scripts

```bash
# Development
npm start          # Start Expo development server
npm run android    # Start on Android
npm run ios        # Start on iOS
npm run web        # Start on web

# Code Quality
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint errors automatically
npm run type-check # Run TypeScript type checking
npm run format     # Format code with Prettier
npm run format:check # Check code formatting
```

## 📝 Development Guidelines

### Code Style

- Use TypeScript with strict mode enabled
- Follow ESLint rules (FSD boundaries are enforced)
- Format code with Prettier before committing
- Use path aliases for imports across layers

### TypeScript

- Never use `any` type
- Use generics instead of `any` where possible
- Avoid type casting (`as`) when possible
- Follow strict TypeScript rules

### Component Structure

- Export components from `index.ts` files (facades)
- Keep components focused and single-purpose
- Use proper TypeScript typing for props

## 🏗️ Architecture Principles

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **Dependency Direction**: Dependencies flow downward (app → shared)
3. **Public API**: Each slice exposes its public API through `index.ts`
4. **Isolation**: Lower layers don't know about upper layers

## 📦 Path Aliases

The project uses TypeScript path aliases for clean imports:

- `@app/*` → `src/app/*`
- `@screens/*` → `src/screens/*`
- `@widgets/*` → `src/widgets/*`
- `@features/*` → `src/features/*`
- `@entities/*` → `src/entities/*`
- `@shared/*` → `src/shared/*`

## 🔍 Linting & Formatting

ESLint is configured with:

- FSD boundaries plugin (enforces layer rules)
- TypeScript support
- React and React Hooks rules
- Prettier integration

Run `npm run lint` to check for issues and `npm run lint:fix` to auto-fix.

## 📄 License

Private project
