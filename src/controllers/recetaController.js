const recetaService = require("../services/recetaService")


async function crearReceta(req, res) {
  try {


    const solicitanteId = req.user.id
    const { pacienteId, medicamentoId, ...datos } = req.body


    const receta = await recetaService.crearReceta(
      solicitanteId,
      pacienteId,
      medicamentoId,
      datos
    )


    res.status(201).json(receta)


  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


async function renovarReceta(req, res) {
  try {


    const { id } = req.params
    const solicitanteId = req.user.id
    const { cantidad, observaciones } = req.body


    const receta = await recetaService.renovarReceta(
      id,
      solicitanteId,
      { cantidad, observaciones }
    )


    res.json(receta)


  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


async function obtenerRecetasAfiliado(req, res) {
  try {


    const { pacienteId } = req.params
    const solicitanteId = req.user.id


    const recetas = await recetaService.obtenerRecetasAfiliado(
      solicitanteId,
      pacienteId
    )


    res.json(recetas)


  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


async function obtenerRecetaPorId(req, res) {
  try {


    const { id } = req.params
    const solicitanteId = req.user.id


    const receta = await recetaService.obtenerRecetaPorId(id, solicitanteId)


    res.json(receta)


  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}


module.exports = {
  crearReceta,
  renovarReceta,
  obtenerRecetasAfiliado,
  obtenerRecetaPorId
}