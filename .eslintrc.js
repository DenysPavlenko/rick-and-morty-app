module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'linebreak-style': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'arrow-parens': 0,
    'arrow-body-style': 1,
    'react/forbid-prop-types': 0,
    'max-len': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/state-in-constructor': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'import/no-named-as-default': 0,
    'no-underscore-dangle': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
