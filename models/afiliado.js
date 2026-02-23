    'use strict';
    const {
    Model
    } = require('sequelize');
    module.exports = (sequelize, DataTypes) => {
    class Afiliado extends Model {
        static associate(models) {
    Afiliado.belongsTo(models.GrupoFamiliar, {
    foreignKey: 'grupo_familiar_id'
    });    }

    }
    Afiliado.init({
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        dni: DataTypes.STRING,
        contrasena: DataTypes.STRING,
        fecha_nacimiento: DataTypes.DATE,
        parentesco: DataTypes.STRING,
        activo: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Afiliado',
    });
    return Afiliado;
    };