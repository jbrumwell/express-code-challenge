import assertEnv from 'assert-env';

assertEnv([
  'NODE_ENV',
  'DATABASE_HOST',
  'DATABASE_USERNAME',
  'DATABASE_PASSWORD',
  'JWT_SECRET',
]);
