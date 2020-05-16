module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('exercises', {
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
      modality: {
        type: Sequelize.ENUM([
          'peito',
          'costas',
          'ombro',
          'bíceps',
          'tríceps',
          'panturrilha',
          'perna',
          'glúteos',
          'abdômen',
        ]),
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('exercises');
  },
};
