const Joi = require("joi")

const ESTADOS = ["PENDIENTE", "APROBADA", "RECHAZADA"]

const createRecetaSchema = Joi.object({
  solicitanteId: Joi.number()
    .integer()
    .positive()
    .required(),

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
    .required(),

  observaciones: Joi.string()
    .allow("", null)
})

const renovarRecetaSchema = Joi.object({
  solicitanteId: Joi.number()
    .integer()
    .positive()
    .required(),

  cantidad: Joi.number()
    .integer()
    .positive(),

  observaciones: Joi.string()
    .allow("", null)
})

module.exports = {
  createRecetaSchema,
  renovarRecetaSchema
}