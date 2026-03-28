const { Especialidad } = require("../../models")

async function validarEspecialidad(especialidadId) {
  const especialidad = await Especialidad.findByPk(especialidadId)

  if (!especialidad) {
    throw new Error("La especialidad no existe")
  }

  return especialidad
}

module.exports = {
  validarEspecialidad
}