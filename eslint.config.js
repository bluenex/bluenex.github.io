import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import-x";
import prettierPlugin from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [".astro/**", ".wrangler/**", "dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-non-null-assertion": "error",
      "import/named": "off",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
      "import/order": [
        "warn",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "prettier/prettier": "warn",
      ...reactHooks.configs.recommended.rules,
    },
  },
);
