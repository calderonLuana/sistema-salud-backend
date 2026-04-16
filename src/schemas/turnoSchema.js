const Joi = require("joi")


const createTurnoSchema = Joi.object({
  pacienteId: Joi.number().integer().positive().required(),
  disponibilidadId: Joi.number().integer().positive().required()
})


const cancelarTurnoSchema = Joi.object({
  afiliadoId: Joi.number().integer().positive().optional()
})


module.exports = {
  createTurnoSchema,
  cancelarTurnoSchema
}