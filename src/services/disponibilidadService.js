const { Disponibilidad, Profesional, Especialidad } = require("../../models")
const { yaPaso } = require("../utils/fechas")

async function obtenerDisponibilidadesLibres(profesionalId) {

  const where = { estado: "DISPONIBLE" }

  if (profesionalId) {
    where.profesionalId = profesionalId
  }

  const disponibilidades = await Disponibilidad.findAll({
    where,
    include: {
      model: Profesional,
      include: {
        model: Especialidad
      }
    },
    order: [["fecha", "ASC"], ["hora", "ASC"]]
  })

  // No se ofrecen horarios que ya pasaron
  return disponibilidades.filter((disponibilidad) => !yaPaso(disponibilidad))
}

module.exports = {
  obtenerDisponibilidadesLibres
}