const { Disponibilidad, Profesional } = require("../../models")
const {
  obtenerDisponibilidadesLibres
} = require("../services/disponibilidadService")

const listarDisponibilidades = async (req, res) => {
  try {
    const disponibilidades = await Disponibilidad.findAll({
      include: {
        model: Profesional,
        attributes: ["id", "nombre", "apellido"]
      }
    })

    res.json(disponibilidades)
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener disponibilidades"
    })
  }
}

const listarDisponibilidadesLibres = async (req, res) => {
  try {
    const disponibilidades = await obtenerDisponibilidadesLibres()

    res.json(disponibilidades)
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener disponibilidades libres"
    })
  }
}

const obtenerDisponibilidad = async (req, res) => {
  try {
    const { id } = req.params

    const disponibilidad = await Disponibilidad.findByPk(id)

    if (!disponibilidad) {
      return res.status(404).json({
        error: "Disponibilidad no encontrada"
      })
    }

    res.json(disponibilidad)
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener la disponibilidad"
    })
  }
}

module.exports = {
  listarDisponibilidades,
  listarDisponibilidadesLibres,
  obtenerDisponibilidad
}