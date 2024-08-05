// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "finance-data-fetcher",
      script: "app.js",
      watch: true,
      ignore_watch: ["node_modules", "server/logs"], // Excluye la carpeta de logs y node_modules
      env: {
        PORT: 8085,
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
