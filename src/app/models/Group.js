import Sequelize, { Model } from 'sequelize';

class Group extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
        },
        executions: {
          type: Sequelize.VIRTUAL,
        },
        goal: {
          type: Sequelize.INTEGER,
          defaultValue: 30,
        },
        validity: {
          type: Sequelize.DATE,
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Training, {
      foreignKey: 'last_training_id',
      as: 'last_training',
    });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, {
      foreignKey: 'instructor_id',
      as: 'instructor',
    });
  }
}

export default Group;
