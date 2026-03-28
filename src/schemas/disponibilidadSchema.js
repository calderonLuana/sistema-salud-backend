const Joi = require("joi")

const ESTADOS = ["DISPONIBLE", "RESERVADA"]

const createDisponibilidadSchema = Joi.object({
  profesionalId: Joi.number()
    .integer()
    .positive()
    .required(),

  fecha: Joi.date()
    .required(),

  hora: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required(),

  lugar: Joi.string()
    .min(3)
    .max(100)
    .required(),

  estado: Joi.string()
    .valid(...ESTADOS)
    .default("DISPONIBLE")
})

module.exports = {
  createDisponibilidadSchema
}