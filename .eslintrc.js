module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "prettier"],
  plugins: ["unused-imports"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
        sourceType: "module",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["tsconfig.eslint.json"],
  },
  rules: {
    semi: "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/promise-function-async": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-empty-interface": "off",
    eqeqeq: ["error", "smart"],
  },
};
