module.exports = {
  rules: {
    'no-unused-vars': ['warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false
      }
    ]
  },
  env: {
    browser: true
  },
  globals: {
    document: 'readonly'
  }
}
