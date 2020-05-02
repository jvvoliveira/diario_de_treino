module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('exercises_trainings', {
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
      exercise_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'exercises',
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
    return queryInterface.dropTable('exercises_trainings');
  },
};
