const turnoService = require("../services/turnoService")

async function crearTurno(req, res) {
  try {

    const { solicitanteId, pacienteId, disponibilidadId } = req.body

    const turno = await turnoService.crearTurno(
      solicitanteId,
      pacienteId,
      disponibilidadId
    )

    res.status(201).json(turno)

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

async function cancelarTurno(req, res) {
  try {

    const { id } = req.params
    const { afiliadoId } = req.body

    const turno = await turnoService.cancelarTurno(
      id,
      afiliadoId
    )

    res.json(turno)

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

async function obtenerTurnosProximos(req, res) {
  try {

    const { pacienteId } = req.params

    const turnos = await turnoService.obtenerTurnosProximos(
      pacienteId
    )

    res.json(turnos)

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

async function obtenerTurnosAnteriores(req, res) {
  try {

    const { pacienteId } = req.params

    const turnos = await turnoService.obtenerTurnosAnteriores(
      pacienteId
    )

    res.json(turnos)

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  crearTurno,
  cancelarTurno,
  obtenerTurnosProximos,
  obtenerTurnosAnteriores
}