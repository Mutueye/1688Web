module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    {
      name      : '1688Web',
      script    : 'index.js',
      env: {
        PORT:3023,
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        PORT: 3023,
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   * pm2 deploy ecosystem.config.js production setup
   * pm2 deploy ecosystem.config.js production
   */
  deploy : {
    production : {
      user : '{username}',
      host : '{host}',
      ref  : 'origin/master',
      repo : 'https://github.com/Mutueye/shibei-data.git',
      path : '{path}',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : '{username}',
      host : '{host}',
      ref  : 'origin/master',
      repo : 'https://github.com/Mutueye/shibei-data.git',
      path : '{path}',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
