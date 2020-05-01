import Sequelize, { Model } from 'sequelize';

class Exercicie extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
        },
        modality: {
          type: Sequelize.ENUM([
            'peito',
            'costas',
            'ombro',
            'bíceps',
            'tríceps',
            'panturrilha',
            'perna',
            'glúteos',
            'abdômen',
          ]),
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Exercicie;
