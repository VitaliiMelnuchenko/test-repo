module.exports = {
  // to call health check run http://18.189.29.136/hc
  // to deploy run: pm2 deploy ecosystem.config.js production

  apps : [{
    name: 'Back-end api',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      PORT: 80,
      NODE_ENV: 'production',
      MONGODB_URL: '' // replace with correct mongo url
    }
  }],

  deploy : {
    production : {
      key: "~/.ssh/trainingCenter6.pem", // deploy from local-machine
      user : 'ubuntu',
      host : '18.189.29.136',
      ref  : 'origin/develop',
      repo : 'http://gitlab+deploy-token-97628:FKmf-4mtVfhf4JW5Y93n@gitlab.com/techmagic/RecruterApp-Backend.git',
      path : '/home/ubuntu/recruitment-back-end',
      ssh_options: "StrictHostKeyChecking=no",
      'post-deploy' : 'npm install && sudo pm2 reload ecosystem.config.js --env production --force'
    }
  }
};
