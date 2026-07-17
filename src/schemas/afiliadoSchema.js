const Joi = require("joi")

// ENUMS (para reutilizar)
const TIPOS = ["TITULAR", "CONYUGE", "HIJO"]
const ESTADOS = ["ACTIVO", "INACTIVO"]

// Registro (crear credenciales, no afiliado)
const registroSchema = Joi.object({
  dni: Joi.string().required(),
  password: Joi.string().min(4).required(),
  confirmarPassword: Joi.string().required()
})

// Login
const loginSchema = Joi.object({
  dni: Joi.string()
    .pattern(/^[0-9]{7,8}$/)
    .required(),

  password: Joi.string()
    .required()
})

// Creacion (solo para pruebas)
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

// Update (por el momento opcional)
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