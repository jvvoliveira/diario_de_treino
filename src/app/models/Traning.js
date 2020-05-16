import Sequelize, { Model } from 'sequelize';

class Training extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
        },
        executions: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Group, { foreignKey: 'group_id', as: 'group' });
  }
}

export default Training;
