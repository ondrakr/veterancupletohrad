module.exports = {
  apps: [
    {
      name: "veterancup",
      script: "server.js",
      cwd: "/var/www/veterancup",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
        DB_HOST: "localhost",
        DB_PORT: 3306,
        DB_USER: "root",
        DB_PASSWORD: "ZMĚŇ_HESLO",
        DB_NAME: "veterancup",
        SITE_DOMAIN: "veterancupletohrad.cz",
        SITE_URL: "https://veterancupletohrad.cz",
        JWT_SECRET: "ZMĚŇ_NA_SILNÝ_SECRET",
      },
    },
  ],
};
