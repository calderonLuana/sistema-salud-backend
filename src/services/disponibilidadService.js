const { Disponibilidad, Turno } = require("../../models")

async function obtenerDisponibilidadesLibres() {

  const disponibilidades = await Disponibilidad.findAll()

  const turnos = await Turno.findAll({
    attributes: ["disponibilidadId"]
  })

  const ocupadas = turnos.map(t => t.disponibilidadId)

  const libres = disponibilidades.filter(
    d => !ocupadas.includes(d.id)
  )

  return libres
}

module.exports = {
  obtenerDisponibilidadesLibres
}