const { env } = process;

module.exports = {
  development: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: 'database_development',
    host: env.DATABASE_HOST,
    dialect: 'postgres',
    define: {
      underscored: true,
    },
  },
  test: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: 'database_test',
    host: env.DATABASE_HOST,
    dialect: 'postgres',
    define: {
      underscored: true,
    },
  },
  production: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: 'database_production',
    host: env.DATABASE_HOST,
    dialect: 'postgres',
    define: {
      underscored: true,
    },
  },
};
