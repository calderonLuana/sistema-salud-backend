'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GrupoFamiliar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
GrupoFamiliar.hasMany(models.Afiliado, {
  foreignKey: 'grupo_familiar_id'
});    }
  }
  GrupoFamiliar.init({
    titular_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GrupoFamiliar',
  });
  return GrupoFamiliar;
};