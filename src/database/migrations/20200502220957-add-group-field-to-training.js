module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('trainings', 'group_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'groups',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('trainings', 'group_id');
  },
};
