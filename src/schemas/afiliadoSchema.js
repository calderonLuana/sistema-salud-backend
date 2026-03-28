const Joi = require("joi")

// ENUMS (para reutilizar)
const TIPOS = ["TITULAR", "CONYUGE", "HIJO"]
const ESTADOS = ["ACTIVO", "INACTIVO"]

// REGISTRO (crear credenciales, no afiliado)
const registroSchema = Joi.object({
  afiliadoId: Joi.number().integer().required(),

  password: Joi.string()
    .min(6)
    .max(50)
    .required()
})

// LOGIN
const loginSchema = Joi.object({
  dni: Joi.string()
    .pattern(/^[0-9]{7,8}$/)
    .required(),

  password: Joi.string()
    .required()
})

// CREACIÓN (solo si lo usás para testing)
const createAfiliadoSchema = Joi.object({
  grupoFamiliarId: Joi.number().integer().required(),

  dni: Joi.string()
    .pattern(/^[0-9]{7,8}$/)
    .required(),

  nombre: Joi.string().min(2).max(50).required(),

  apellido: Joi.string().min(2).max(50).required(),

  fechaNacimiento: Joi.date().less("now").required(),

  tipoAfiliado: Joi.string()
    .valid(...TIPOS)
    .required(),

  estado: Joi.string()
    .valid(...ESTADOS)
    .default("ACTIVO")
})

// UPDATE (opcional)
const updateAfiliadoSchema = Joi.object({
  nombre: Joi.string().min(2).max(50),
  apellido: Joi.string().min(2).max(50),
  fechaNacimiento: Joi.date().less("now"),
  estado: Joi.string().valid(...ESTADOS)
})

module.exports = {
  registroSchema,
  loginSchema,
  createAfiliadoSchema,
  updateAfiliadoSchema
}