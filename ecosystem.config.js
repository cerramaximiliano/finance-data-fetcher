// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: "finance-data-fetcher",
        script: "server/app.js",
        watch: true,
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