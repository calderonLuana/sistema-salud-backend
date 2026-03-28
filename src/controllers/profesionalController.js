const { Profesional, Especialidad } = require("../../models")
const { validarEspecialidad } = require("../services/profesionalService")

const crearProfesional = async (req, res) => {
  try {
    const { nombre, apellido, especialidadId } = req.body

    await validarEspecialidad(especialidadId)

    const profesional = await Profesional.create({
      nombre,
      apellido,
      especialidadId
    })

    res.status(201).json(profesional)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const listarProfesionales = async (req, res) => {
  try {
    const profesionales = await Profesional.findAll({
      include: {
        model: Especialidad,
        attributes: ["id", "nombre"]
      }
    })

    res.json(profesionales)
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener profesionales"
    })
  }
}

const obtenerProfesional = async (req, res) => {
  try {
    const { id } = req.params

    const profesional = await Profesional.findByPk(id, {
      include: {
        model: Especialidad,
        attributes: ["id", "nombre"]
      }
    })

    if (!profesional) {
      return res.status(404).json({
        error: "Profesional no encontrado"
      })
    }

    res.json(profesional)
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el profesional"
    })
  }
}

module.exports = {
  crearProfesional,
  listarProfesionales,
  obtenerProfesional
}