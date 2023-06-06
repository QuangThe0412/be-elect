const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@/styles': 'src/styles',
    '@/app': 'src/app',
    '@/components': 'src/components',
    '@/services': 'src/services',
  })(config);

  return config;
};