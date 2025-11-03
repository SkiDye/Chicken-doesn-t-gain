module.exports = {
  apps: [{
    name: '치킨은-살-안-쪄',
    script: 'start.bat',
    cwd: 'C:\\Claude\\치킨은 살 안 쪄\\frontend',
    watch: false,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    interpreter: 'cmd.exe',
    interpreter_args: '/c',
    env: {
      NODE_ENV: 'development'
    },
    error_file: 'C:\\Claude\\치킨은 살 안 쪄\\logs\\error.log',
    out_file: 'C:\\Claude\\치킨은 살 안 쪄\\logs\\output.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
