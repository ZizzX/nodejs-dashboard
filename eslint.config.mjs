import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  ...[
    ...tseslint.configs.recommended,
    {
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "no-undef": "warn",
        "object-curly-spacing": ["error", "always"],
        "indent": ["error", "tab"],
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "max-len": ["error", { "code": 120, "ignoreUrls": true }],
        "@typescript-eslint/explicit-function-return-type": "error",
      }
  }],
  eslintConfigPrettier,
];
