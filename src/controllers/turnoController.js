const turnoService = require("../services/turnoService");

async function crearTurno(req, res) {
  try {
    const solicitanteId = req.user.id;
    const { pacienteId, disponibilidadId } = req.body;

    const turno = await turnoService.crearTurno(
      solicitanteId,
      pacienteId,
      disponibilidadId
    );

    res.status(201).json(turno);
  } catch (error) {
    console.error("ERROR CREANDO TURNO:");
    console.error(error);

    res.status(400).json({
      error: error.message,
      detalle: error.errors || null
    });
  }
}

async function cancelarTurno(req, res) {
  try {
    const { id } = req.params;
    const afiliadoId = req.user.id;

    const turno = await turnoService.cancelarTurno(
      id,
      afiliadoId
    );

    res.json(turno);
  } catch (error) {
    console.error("ERROR CANCELANDO TURNO:");
    console.error(error);

    res.status(400).json({
      error: error.message
    });
  }
}

async function editarTurno(req, res) {
  try {
    const { id } = req.params;
    const afiliadoId = req.user.id;
    const { pacienteId, nuevaDisponibilidadId } = req.body;

    const turno = await turnoService.editarTurno(
      id,
      afiliadoId,
      { pacienteId, nuevaDisponibilidadId }
    );

    res.json(turno);
  } catch (error) {
    console.error("ERROR EDITANDO TURNO:");
    console.error(error);

    res.status(400).json({
      error: error.message
    });
  }
}

async function obtenerTurnoPorId(req, res) {
  try {
    const { id } = req.params;

    const turno = await turnoService.obtenerTurnoPorId(id);

    res.json(turno);
  } catch (error) {
    console.error("ERROR OBTENIENDO TURNO:");
    console.error(error);

    res.status(404).json({
      error: error.message
    });
  }
}

async function obtenerTurnosProximos(req, res) {
  try {
    const { pacienteId } = req.params;

    const turnos = await turnoService.obtenerTurnosProximos(
      pacienteId
    );

    res.json(turnos);
  } catch (error) {
    console.error("ERROR OBTENIENDO TURNOS PROXIMOS:");
    console.error(error);

    res.status(400).json({
      error: error.message
    });
  }
}

async function obtenerTurnosAnteriores(req, res) {
  try {
    const { pacienteId } = req.params;

    const turnos = await turnoService.obtenerTurnosAnteriores(
      pacienteId
    );

    res.json(turnos);
  } catch (error) {
    console.error("ERROR OBTENIENDO HISTORIAL:");
    console.error(error);

    res.status(400).json({
      error: error.message
    });
  }
}

module.exports = {
  crearTurno,
  cancelarTurno,
  editarTurno,
  obtenerTurnoPorId,
  obtenerTurnosProximos,
  obtenerTurnosAnteriores
};