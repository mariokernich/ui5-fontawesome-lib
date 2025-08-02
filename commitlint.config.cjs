module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        [
          'mod',
          'add',
          'del',
          'refac',
          'feat',
          'fix'
        ]
      ], 
      'header-max-length': [2, 'always', 110]
    }
  };