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
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/files/${this.path}`;
          },
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
