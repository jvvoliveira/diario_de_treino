import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Relationship from '../app/models/Relationship';

import databaseConfig from '../config/database';

const models = [User, File, Relationship];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
