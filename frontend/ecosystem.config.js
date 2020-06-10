module.exports = {
  apps : [{
    script: 'npm start',
    watch: '.'
  }],

  deploy : {
    production : {
      user : 'bitnami',
      host : '100.27.30.185',
      ref  : 'origin/master',
      repo : 'https://github.com/programadormkt/market',
      path : '/opt/bitnami/apps/wordpress/market/frontend',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
