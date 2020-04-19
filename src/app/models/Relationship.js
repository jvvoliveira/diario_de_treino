import { Model } from 'sequelize';

class Relationship extends Model {
  static init(sequelize) {
    super.init(null, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, {
      foreignKey: 'instructor_id',
      as: 'instructor',
    });
  }
}

export default Relationship;
