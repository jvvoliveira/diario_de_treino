import Sequelize, { Model } from 'sequelize';

class ExercisesTrainings extends Model {
  static init(sequelize) {
    super.init(
      {
        series: {
          type: Sequelize.INTEGER,
        },
        repetitions: {
          type: Sequelize.STRING,
        },
        rest: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Exercise, {
      foreignKey: 'exercise_id',
      as: 'exercise',
    });
    this.belongsTo(models.Training, {
      foreignKey: 'training_id',
      as: 'training',
    });
  }
}

export default ExercisesTrainings;
