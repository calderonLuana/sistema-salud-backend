const Joi = require("joi")

const createProfesionalSchema = Joi.object({
  nombre: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .required(),

  apellido: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .required(),

  especialidadId: Joi.number()
    .integer()
    .positive()
    .required()
})

module.exports = {
  createProfesionalSchema
}