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
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Training;
