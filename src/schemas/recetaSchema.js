const Joi = require("joi")

const ESTADOS = ["PENDIENTE", "APROBADA", "RECHAZADA"]

const createRecetaSchema = Joi.object({
  pacienteId: Joi.number()
    .integer()
    .positive()
    .required(),

  medicamentoId: Joi.number()
    .integer()
    .positive()
    .required(),

  presentacion: Joi.string()
    .min(2)
    .max(100)
    .required(),

  cantidadComprimidos: Joi.number()
    .integer()
    .positive()
    .required(),

  cantidad: Joi.number()
    .integer()
    .positive()
    .max(2)
    .required(),

  observaciones: Joi.string()
    .allow("", null)
})

const renovarRecetaSchema = Joi.object({
  cantidad: Joi.number()
    .integer()
    .positive()
    .max(2),

  observaciones: Joi.string()
    .allow("", null)
})

module.exports = {
  createRecetaSchema,
  renovarRecetaSchema
}