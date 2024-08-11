module.exports = {
  apps: [
    {
      name: 'midway-backend',
      script: 'dist/main.js',
      cwd: './hhikr_kanban_backend',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'react-frontend',
      script: 'serve',
      args: '',
      cwd: './hhikr_kanban_frontend',
      env: {
        NODE_ENV: 'production',
        PORT: 4444,  // 设置环境变量
      },
      env_production: {
        PORT: 4444,  // 在生产环境中也设置端口
      }
    }
  ],
};
