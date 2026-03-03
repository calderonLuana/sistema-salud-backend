'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GrupoFamiliar extends Model {
   static associate(models) {
  GrupoFamiliar.hasMany(models.Afiliado, {
    foreignKey: 'grupoFamiliarId'
  });
}
  }
  GrupoFamiliar.init({
numeroGrupo: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
}  }, {
    sequelize,
    modelName: 'GrupoFamiliar',
  });
  return GrupoFamiliar;
};