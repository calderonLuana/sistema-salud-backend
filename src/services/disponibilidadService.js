const { Disponibilidad } = require("../../models")

async function obtenerDisponibilidadesLibres() {
  return await Disponibilidad.findAll({
    where: { estado: "DISPONIBLE" }
  })
}

module.exports = {
  obtenerDisponibilidadesLibres
}