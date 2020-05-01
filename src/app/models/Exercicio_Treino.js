import Sequelize, { Model } from 'sequelize';

class Exercicio_Treino extends Model {
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
    this.belongsTo(models.Exercicie, {
      foreignKey: 'exercicie_id',
      as: 'exercicie',
    });
    this.belongsTo(models.Training, {
      foreignKey: 'training_id',
      as: 'training',
    });
  }
}

export default Exercicio_Treino;
