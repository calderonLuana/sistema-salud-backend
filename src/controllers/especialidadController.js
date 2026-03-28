const { Especialidad } = require("../../models")

const listarEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.findAll()

    res.json(especialidades)
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener especialidades"
    })
  }
}

const obtenerEspecialidad = async (req, res) => {
  try {
    const { id } = req.params

    const especialidad = await Especialidad.findByPk(id)

    if (!especialidad) {
      return res.status(404).json({
        error: "Especialidad no encontrada"
      })
    }

    res.json(especialidad)
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener la especialidad"
    })
  }
}

module.exports = {
  listarEspecialidades,
  obtenerEspecialidad
}