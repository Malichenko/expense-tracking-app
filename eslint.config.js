import js from "@eslint/js"
import tsParser from "@typescript-eslint/parser"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import boundariesPlugin from "eslint-plugin-boundaries"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import importPlugin from "eslint-plugin-import"
import prettierPlugin from "eslint-plugin-prettier"

export default [
  js.configs.recommended,
  {
    ignores: [
      "node_modules/**",
      "*.config.js",
      "*.config.ts",
      "metro.config.js",
      "babel.config.js",
      "jest.config.js",
      "eslint.config.js",
      ".expo/**",
      "dist/**",
      "build/**",
    ],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
      globals: {
        console: "readonly",
        process: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      boundaries: boundariesPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      "boundaries/elements": [
        { type: "app", pattern: "src/app/*" },
        { type: "screens", pattern: "src/screens/*" },
        { type: "widgets", pattern: "src/widgets/*" },
        { type: "features", pattern: "src/features/*" },
        { type: "entities", pattern: "src/entities/*" },
        { type: "shared", pattern: "src/shared/*" },
      ],
      "boundaries/ignore": ["**/*.test.*", "**/*.spec.*"],
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      ...tsPlugin.configs["recommended"].rules,
      "react/react-in-jsx-scope": "off",
      "no-console": "error",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "prettier/prettier": "error",
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "app",
              allow: ["app", "screens", "widgets", "features", "entities", "shared"],
            },
            {
              from: "screens",
              allow: ["widgets", "features", "entities", "shared"],
            },
            {
              from: "widgets",
              allow: ["features", "entities", "shared"],
            },
            {
              from: "features",
              allow: ["entities", "shared"],
            },
            {
              from: "entities",
              allow: ["shared"],
            },
            {
              from: "shared",
              allow: ["shared"],
            },
          ],
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@entities/*/model/*",
                "@features/*/ui/*",
                "@widgets/*/ui/*",
                "@screens/*/ui/*",
              ],
              message:
                "Import from index.ts facades only, not deep paths.",
            },
            {
              group: [
                "../../entities/*",
                "../../features/*",
                "../../widgets/*",
                "../../screens/*",
              ],
              message:
                "Use path aliases (@entities/*, @features/*, etc.) instead of relative imports across layers.",
            },
          ],
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector:
            'ExportAllDeclaration[source.value=/^@(entities|features|widgets|screens)/]',
          message:
            "Do not re-export entire layers. Export specific symbols from index.ts.",
        },
      ],
    },
  },
  {
    files: ["src/**/*.test.{ts,tsx}", "src/**/*.spec.{ts,tsx}"],
    rules: {
      "boundaries/element-types": "off",
    },
  },
  {
    files: ["src/entities/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@entities/*"],
              message:
                "Entities must not import from other entities or their own public API. Use relative imports within the same entity slice.",
            },
          ],
        },
      ],
    },
  },
];

