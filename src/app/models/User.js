import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        password_hash: {
          type: Sequelize.STRING,
        },
        instructor: {
          type: Sequelize.BOOLEAN,
          default: false,
        },
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
