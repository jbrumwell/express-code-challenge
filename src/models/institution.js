import { Model } from 'sequelize';

class Institution extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: DataTypes.STRING,
        url: DataTypes.STRING,
        domain: DataTypes.STRING,
      },
      {
        tableName: 'institutions',
        timestamps: false,
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.User);
    this.belongsToMany(models.Book, {
      through: 'institution_books',
      timestamps: false,
    });
  }
}

export default Institution;
