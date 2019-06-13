import path from 'path';
import Sequelize from 'sequelize';
import configs from 'config/config';
import { each, isFunction } from 'lodash';
import glob from 'glob';

const env = process.env.NODE_ENV;
const config = configs[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const paths = glob.sync(path.join(__dirname, '**/*.js'));

each(paths, (file) => {
  if (file !== __filename) {
    // eslint-disable-next-line
    const model = require(file).default;

    if (isFunction(model.init)) {
      model.init(sequelize, Sequelize);

      db[model.name] = model;
    }
  }
});

each(db, (model) => {
  if (isFunction(model.associate)) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
