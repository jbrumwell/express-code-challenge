import { Model } from 'sequelize';

class Book extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        isbn: DataTypes.STRING,
        title: DataTypes.STRING,
        author: DataTypes.STRING,
      },
      {
        tableName: 'books',
        timestamps: false,
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsToMany(models.Institution, {
      through: 'institution_books',
      timestamps: false,
    });
  }
}

export default Book;
