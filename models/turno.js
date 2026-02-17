'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  Turno.belongsTo(models.Afiliado, {
    foreignKey: 'afiliado_id'
  });

  Turno.belongsTo(models.Profesional, {
    foreignKey: 'profesional_id'
  });

  Turno.belongsTo(models.Disponibilidad, {
    foreignKey: 'disponibilidad_id'
  });
}
  }
  Turno.init({
    afiliado_id: DataTypes.INTEGER,
    profesional_id: DataTypes.INTEGER,
    disponibilidad_id: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Turno',
  });
  return Turno;
};