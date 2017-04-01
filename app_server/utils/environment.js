const PRODUCTION_ENVIRONMENT = 'production';
const DEVELOPMENT_ENVIRONMENT = 'development';

class Environment {
  get(key) {
    return process.env[key];
  }

  isProduction() {
    return process.env.NODE_ENV == PRODUCTION_ENVIRONMENT;
  }

  isDevelopment() {
    return process.env.NODE_ENV == DEVELOPMENT_ENVIRONMENT;
  }

  getGaiaURL() {
    return this.get('GAIA_URL');
  }

  toString() {
    return process.env.NODE_ENV;
  }
}
module.exports = new Environment();
