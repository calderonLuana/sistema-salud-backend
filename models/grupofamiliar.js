    'use strict';
    const {
      Model
    } = require('sequelize');
    module.exports = (sequelize, DataTypes) => {
      class GrupoFamiliar extends Model {
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