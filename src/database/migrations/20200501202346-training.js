module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('trainings', {
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
      executions: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('trainings');
  },
};
