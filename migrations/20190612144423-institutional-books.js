'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('institution_books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      book_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'books',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      institution_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'institutions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('institution_books');
  },
};
