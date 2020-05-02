import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Relationship from '../app/models/Relationship';
import Exercise from '../app/models/Exercise';
import Training from '../app/models/Traning';
import ExercisesTrainings from '../app/models/ExercisesTrainings';

import databaseConfig from '../config/database';

const models = [
  User,
  File,
  Relationship,
  Exercise,
  Training,
  ExercisesTrainings,
];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
