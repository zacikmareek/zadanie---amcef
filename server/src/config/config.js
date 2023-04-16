module.exports = {
  app_port: process.env.APP_PORT,
  app_cors: process.env.APP_CORS,
  db: {
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET,
  },
};
