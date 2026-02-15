'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profesional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
Profesional.belongsTo(models.Especialidad, {
  foreignKey: 'especialidad_id'
});    }
  }
  Profesional.init({
    nombre: DataTypes.STRING,
    matricula: DataTypes.STRING,
    especialidad_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profesional',
  });
  return Profesional;
};