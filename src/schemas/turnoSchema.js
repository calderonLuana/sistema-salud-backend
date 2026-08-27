const Joi = require("joi")


const createTurnoSchema = Joi.object({
  pacienteId: Joi.number().integer().positive().required(),
  disponibilidadId: Joi.number().integer().positive().required()
})


const cancelarTurnoSchema = Joi.object({
  afiliadoId: Joi.number().integer().positive().optional()
})


const editarTurnoSchema = Joi.object({
  pacienteId: Joi.number().integer().positive().optional(),
  nuevaDisponibilidadId: Joi.number().integer().positive().optional()
}).or("pacienteId", "nuevaDisponibilidadId")


module.exports = {
  createTurnoSchema,
  cancelarTurnoSchema,
  editarTurnoSchema
}