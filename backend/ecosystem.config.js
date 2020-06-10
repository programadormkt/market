module.exports = {
  apps : [{
    script: 'server.js',
    watch: '.'
  },],

  deploy : {
    production : {
      user : 'bitnami',
      host : '100.27.30.185',
      ref  : 'origin/master',
      repo : 'https://github.com/programadormkt/market',
      path : '/opt/bitnami/apps/wordpress/market/backend',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
