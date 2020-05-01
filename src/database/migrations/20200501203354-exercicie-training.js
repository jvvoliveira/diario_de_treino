module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('exercicies-trainings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      series: {
        type: Sequelize.INTEGER,
      },
      repetitions: {
        type: Sequelize.STRING,
      },
      rest: {
        type: Sequelize.INTEGER,
      },
      exercicie_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'exercicies',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      training_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'trainings',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('exercicies-trainings');
  },
};
