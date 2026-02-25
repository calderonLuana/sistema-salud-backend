'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Turno extends Model {
    static associate(models) {

      Turno.belongsTo(models.Afiliado, {
        foreignKey: {
          name: 'afiliado_id',
          allowNull: false
        }
      });

      Turno.belongsTo(models.Profesional, {
        foreignKey: {
          name: 'profesional_id',
          allowNull: false
        }
      });

      Turno.belongsTo(models.Disponibilidad, {
        foreignKey: {
          name: 'disponibilidad_id',
          allowNull: false
        }
      });

    }
  }

  Turno.init({
    afiliado_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    profesional_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    disponibilidad_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true  
    },

    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },

    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pendiente',
      validate: {
       isIn: [['pendiente', 'confirmado', 'cancelado', 'completado', 'ausente']]
      }
    }

  }, {
    sequelize,
    modelName: 'Turno',
    tableName: 'Turnos'
  });

  return Turno;
};