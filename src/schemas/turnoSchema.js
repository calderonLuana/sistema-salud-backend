const Joi = require("joi")

const createTurnoSchema = Joi.object({
  solicitanteId: Joi.number()
    .integer()
    .positive()
    .required(),

  pacienteId: Joi.number()
    .integer()
    .positive()
    .required(),

  disponibilidadId: Joi.number()
    .integer()
    .positive()
    .required()
})

const cancelarTurnoSchema = Joi.object({
  afiliadoId: Joi.number()
    .integer()
    .positive()
    .required()
})

module.exports = {
  createTurnoSchema,
  cancelarTurnoSchema
}