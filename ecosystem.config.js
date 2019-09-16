module.exports = {
  apps : [{
    name: 'Back-end api',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      MONGODB_URL: 'mongodb://localhost/test'
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
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production --force'
    }
  }
};
