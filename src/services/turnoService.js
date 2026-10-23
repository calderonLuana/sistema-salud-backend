const {
  Turno,
  Disponibilidad,
  Profesional,
  Especialidad
} = require("../../models");

const afiliadoService = require("./afiliadoService");
const {
  fechaHoraDeDisponibilidad,
  horasHasta,
  yaPaso
} = require("../utils/fechas");


// Crea un error con un código de estado HTTP asociado.
// El controller lo usa para responder 403, 404, etc. en vez de un 400 genérico.
function crearError(mensaje, status) {
  const error = new Error(mensaje);
  error.status = status;
  return error;
}


// Permiso de GESTIÓN (acciones): si falla, se informa como 403
async function verificarGestion(solicitanteId, pacienteId) {
  try {
    await afiliadoService.verificarPermisoGestion(
      solicitanteId,
      pacienteId
    );
  } catch (error) {
    throw crearError(error.message, 403);
  }
}


// Permiso de VISUALIZACIÓN (consultas): si falla, se informa como 403
async function verificarVisualizacion(solicitanteId, pacienteId) {
  try {
    await afiliadoService.verificarPermisoVisualizacion(
      solicitanteId,
      pacienteId
    );
  } catch (error) {
    throw crearError(error.message, 403);
  }
}


async function crearTurno(
  solicitanteId,
  pacienteId,
  disponibilidadId
) {

  await afiliadoService.validarAfiliadoActivo(solicitanteId);

  await afiliadoService.validarAfiliadoActivo(pacienteId);

  await verificarGestion(solicitanteId, pacienteId);


  const disponibilidad = await Disponibilidad.findByPk(
    disponibilidadId
  );

  if (!disponibilidad) {
    throw new Error("Disponibilidad no existe");
  }


  if (yaPaso(disponibilidad)) {
    throw new Error("No se puede reservar un horario que ya pasó");
  }


  if (disponibilidad.estado === "RESERVADA") {
    throw new Error("La disponibilidad ya está reservada");
  }


  const turnoExistente = await Turno.findOne({
    where: {
      disponibilidadId,
      estado: "RESERVADO"
    }
  });

  if (turnoExistente) {
    throw new Error("La disponibilidad ya está reservada");
  }


  const turno = await Turno.create({
    solicitanteId,
    pacienteId,
    disponibilidadId,
    estado: "RESERVADO"
  });


  disponibilidad.estado = "RESERVADA";

  await disponibilidad.save();


  return turno;
}


async function cancelarTurno(
  turnoId,
  afiliadoId
) {

  const turno = await Turno.findByPk(turnoId);

  if (!turno) {
    throw crearError("Turno no encontrado", 404);
  }


  await verificarGestion(afiliadoId, turno.pacienteId);


  if (turno.estado !== "RESERVADO") {
    throw new Error("Solo se pueden cancelar turnos reservados");
  }


  const disponibilidad = await Disponibilidad.findByPk(
    turno.disponibilidadId
  );


  if (horasHasta(disponibilidad) < 24) {
    throw new Error(
      "No se puede cancelar con menos de 24 horas"
    );
  }


  turno.estado = "CANCELADO";

  await turno.save();


  disponibilidad.estado = "DISPONIBLE";

  await disponibilidad.save();


  return turno;
}


async function editarTurno(
  turnoId,
  afiliadoId,
  { pacienteId, nuevaDisponibilidadId }
) {

  const turno = await Turno.findByPk(turnoId);

  if (!turno) {
    throw crearError("Turno no encontrado", 404);
  }

  if (turno.estado !== "RESERVADO") {
    throw new Error("Solo se pueden editar turnos reservados");
  }


  await verificarGestion(afiliadoId, turno.pacienteId);


  const disponibilidadActual = await Disponibilidad.findByPk(
    turno.disponibilidadId
  );

  if (horasHasta(disponibilidadActual) < 24) {
    throw new Error(
      "No se puede editar con menos de 24 horas de anticipación"
    );
  }


  if (pacienteId) {

    await afiliadoService.validarAfiliadoActivo(pacienteId);

    await verificarGestion(afiliadoId, pacienteId);

    turno.pacienteId = pacienteId;
  }


  if (nuevaDisponibilidadId) {

    const nuevaDisponibilidad = await Disponibilidad.findByPk(
      nuevaDisponibilidadId
    );

    if (!nuevaDisponibilidad) {
      throw new Error("La nueva disponibilidad no existe");
    }

    if (yaPaso(nuevaDisponibilidad)) {
      throw new Error("No se puede reservar un horario que ya pasó");
    }

    if (nuevaDisponibilidad.estado === "RESERVADA") {
      throw new Error("La nueva disponibilidad ya está reservada");
    }

    if (nuevaDisponibilidad.profesionalId !== disponibilidadActual.profesionalId) {
      throw new Error(
        "No se puede cambiar de profesional al editar el turno"
      );
    }

    const turnoExistente = await Turno.findOne({
      where: {
        disponibilidadId: nuevaDisponibilidadId,
        estado: "RESERVADO"
      }
    });

    if (turnoExistente) {
      throw new Error("La nueva disponibilidad ya está reservada");
    }

    // librar la disponibilidad vieja
    disponibilidadActual.estado = "DISPONIBLE";
    await disponibilidadActual.save();

    nuevaDisponibilidad.estado = "RESERVADA";
    await nuevaDisponibilidad.save();

    turno.disponibilidadId = nuevaDisponibilidadId;
  }


  await turno.save();

  return turno;
}


async function obtenerTurnoPorId(
  turnoId,
  solicitanteId
) {

  const turno = await Turno.findByPk(turnoId, {
    include: {
      model: Disponibilidad,
      include: {
        model: Profesional,
        include: {
          model: Especialidad
        }
      }
    }
  });

  if (!turno) {
    throw crearError("Turno no encontrado", 404);
  }

  await verificarVisualizacion(solicitanteId, turno.pacienteId);

  return turno;
}


// Trae todos los turnos de un paciente con su disponibilidad,
// profesional y especialidad. La separación entre próximos y anteriores
// se hace después, considerando fecha y hora.
async function buscarTurnosDelPaciente(pacienteId) {
  return Turno.findAll({
    where: { pacienteId },

    include: {
      model: Disponibilidad,
      required: true,

      include: {
        model: Profesional,

        include: {
          model: Especialidad
        }
      }
    }
  });
}


//NUEVOOOOO

async function obtenerTurnosProximos(
  solicitanteId,
  pacienteId
) {
  await verificarVisualizacion(solicitanteId, pacienteId);

  const turnos = await buscarTurnosDelPaciente(pacienteId);
  const ahora = new Date();

  const turnosProximos = turnos
    .filter(
      (turno) =>
        turno.estado === "RESERVADO" &&
        fechaHoraDeDisponibilidad(turno.Disponibilidad) > ahora
    )
    .sort(
      (a, b) =>
        fechaHoraDeDisponibilidad(a.Disponibilidad) -
        fechaHoraDeDisponibilidad(b.Disponibilidad)
    );

  const puedeGestionar = await afiliadoService.verificarPermisoGestion(
    solicitanteId,
    pacienteId
  ).then(() => true).catch(() => false);

  return turnosProximos.map((turno) => {
    const horasRestantes = horasHasta(turno.Disponibilidad);
    const puedeActuar =
      puedeGestionar &&
      turno.estado === "RESERVADO" &&
      horasRestantes >= 24;

    return {
      ...turno.toJSON(),
      puedeCancelar: puedeActuar,
      puedeEditar: puedeActuar
    };
  });
}



// Anteriores: todo turno que no sea un reservado futuro (cancelados,
// no asistió y reservados cuya fecha y hora ya pasaron).
// Orden: del más reciente al más antiguo.
async function obtenerTurnosAnteriores(
  solicitanteId,
  pacienteId
) {

  await verificarVisualizacion(solicitanteId, pacienteId);

  const turnos = await buscarTurnosDelPaciente(pacienteId);

  const ahora = new Date();

  return turnos
    .filter(
      (turno) =>
        turno.estado !== "RESERVADO" ||
        fechaHoraDeDisponibilidad(turno.Disponibilidad) <= ahora
    )
    .sort(
      (a, b) =>
        fechaHoraDeDisponibilidad(b.Disponibilidad) -
        fechaHoraDeDisponibilidad(a.Disponibilidad)
    );
}


module.exports = {
  crearTurno,
  cancelarTurno,
  editarTurno,
  obtenerTurnoPorId,
  obtenerTurnosProximos,
  obtenerTurnosAnteriores
};