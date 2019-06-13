import { Model } from 'sequelize';
import crypto from 'crypto';

class User extends Model {
  static roleTypes = {
    student: 'student',
    academic: 'academic',
    administrator: 'administrator',
  };

  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        role: DataTypes.ENUM('student', 'academic', 'administrator'),
        password: DataTypes.STRING,
      },
      {
        tableName: 'users',
        timestamps: false,
        sequelize,

        defaultScope: {
          attributes: {
            exclude: ['password'],
          },
        },
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Institution, { as: 'institution' });
  }

  static encryptPassword(password) {
    const hash = crypto.createHash('sha256');

    hash.update(password);

    return hash.digest('hex');
  }

  verifyPassword(password) {
    return User.encryptPassword(password) === this.getDataValue('password');
  }
}

export default User;
