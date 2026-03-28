const { Medicamento } = require("../../models")

const listarMedicamentos = async (req, res) => {
  try {
    const medicamentos = await Medicamento.findAll()

    res.json(medicamentos)
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener medicamentos"
    })
  }
}

const obtenerMedicamento = async (req, res) => {
  try {
    const { id } = req.params

    const medicamento = await Medicamento.findByPk(id)

    if (!medicamento) {
      return res.status(404).json({
        error: "Medicamento no encontrado"
      })
    }

    res.json(medicamento)
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el medicamento"
    })
  }
}

module.exports = {
  listarMedicamentos,
  obtenerMedicamento
}