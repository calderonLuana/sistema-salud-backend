const Joi = require("joi")

const nombreSchema = Joi.object({
  nombre: Joi.string()
    .min(2)
    .max(100)
    .required()
})

module.exports = {
  nombreSchema
}