const { Disponibilidad, Profesional, Especialidad } = require("../../models")

async function obtenerDisponibilidadesLibres(profesionalId) {

  const where = { estado: "DISPONIBLE" }

  if (profesionalId) {
    where.profesionalId = profesionalId
  }

  return await Disponibilidad.findAll({
    where,
    include: {
      model: Profesional,
      include: {
        model: Especialidad
      }
    }
  })
}

module.exports = {
  obtenerDisponibilidadesLibres
}