const recetaService = require("../services/recetaService")
const { Receta } = require("../../models")

async function crearReceta(req, res) {
  try {

    const { solicitanteId, pacienteId, medicamentoId, ...datosReceta } = req.body

    const receta = await recetaService.crearReceta(
      solicitanteId,
      pacienteId,
      medicamentoId,
      datosReceta
    )

    res.status(201).json(receta)

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

async function renovarReceta(req, res) {
  try {

    const { id } = req.params
    const { solicitanteId, ...datosRenovacion } = req.body

    const receta = await recetaService.renovarReceta(
      id,
      solicitanteId,
      datosRenovacion
    )

    res.json(receta)

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

async function obtenerRecetasPaciente(req, res) {
  try {

    const { pacienteId } = req.params

    const recetas = await Receta.findAll({
      where: { pacienteId }
    })

    res.json(recetas)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function obtenerRecetaPorId(req, res) {
  try {

    const { id } = req.params

    const receta = await Receta.findByPk(id)

    if (!receta) {
      return res.status(404).json({ error: "Receta no encontrada" })
    }

    res.json(receta)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  crearReceta,
  renovarReceta,
  obtenerRecetasPaciente,
  obtenerRecetaPorId
}