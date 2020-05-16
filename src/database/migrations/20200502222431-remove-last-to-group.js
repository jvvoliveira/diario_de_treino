module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('groups', 'last');
  },

  down: queryInterface => {
    return queryInterface.removeColumn('groups', 'last');
  },
};
