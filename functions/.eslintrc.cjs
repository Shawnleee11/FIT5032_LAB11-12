// functions/.eslintrc.cjs
module.exports = {
  root: true,
  env: { node: true, es2021: true },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',   // 关键：把文件当作 ES Module 解析
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    quotes: ['error', 'single'],
    'require-jsdoc': 'off',
    'max-len': 'off',
  },
};
