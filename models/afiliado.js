'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Afiliado extends Model {

    static associate(models) {
  Afiliado.belongsTo(models.GrupoFamiliar, {
    foreignKey: 'grupoFamiliarId'
  });

  Afiliado.hasMany(models.Turno, {
    foreignKey: 'solicitanteId',
    as: 'turnosSolicitados'
  });

  Afiliado.hasMany(models.Turno, {
    foreignKey: 'pacienteId',
    as: 'turnosPaciente'
  });


Afiliado.hasMany(models.Receta, {
  foreignKey: 'solicitanteId',
  as: 'recetasSolicitadas'
});

Afiliado.hasMany(models.Receta, {
  foreignKey: 'pacienteId',
  as: 'recetasPaciente'
});
    }
  }

  Afiliado.init({
    grupoFamiliarId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },

    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },

    tipoAfiliado: {
      type: DataTypes.ENUM('TITULAR', 'CONYUGE', 'HIJO'),
      allowNull: false
    },

    estado: {
      type: DataTypes.ENUM('ACTIVO', 'INACTIVO'),
      defaultValue: 'ACTIVO'
    },

    registrado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
password: {
  type: DataTypes.STRING,
  allowNull: true
}

  }, {
    sequelize,
    modelName: 'Afiliado',
  });

  return Afiliado;
};