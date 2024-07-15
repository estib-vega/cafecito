import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

const overrides = { files: ["./server/**/*.{js,ts}"] };

const configs = [
  { languageOptions: { globals: globals.browser } },
  { ...pluginJs.configs.recommended },
  ...tseslint.configs.recommended,
].map((config) => ({ ...config, ...overrides }));

export default configs;
