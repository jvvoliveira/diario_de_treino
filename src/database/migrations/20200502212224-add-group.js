module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('groups', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      goal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      validity: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      last: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      last_training_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'trainings',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      instructor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('groups');
  },
};
