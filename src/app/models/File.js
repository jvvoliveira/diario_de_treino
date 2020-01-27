import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
        },
        path: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
