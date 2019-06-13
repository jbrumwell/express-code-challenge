'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'institution_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'institutions',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'institution_id');
  },
};
