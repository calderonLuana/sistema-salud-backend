const {
  Turno,
  Disponibilidad,
  Profesional,
  Especialidad
} = require("../../models");

const afiliadoService = require("./afiliadoService");
const { Op } = require("sequelize");


async function crearTurno(
  solicitanteId,
  pacienteId,
  disponibilidadId
) {

  await afiliadoService.validarAfiliadoActivo(solicitanteId);

  await afiliadoService.validarAfiliadoActivo(pacienteId);

  await afiliadoService.verificarPermisoGestion(
    solicitanteId,
    pacienteId
  );


  const disponibilidad = await Disponibilidad.findByPk(
    disponibilidadId
  );

  if (!disponibilidad) {
    throw new Error("Disponibilidad no existe");
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
    throw new Error("Turno no encontrado");
  }


  await afiliadoService.verificarPermisoGestion(
    afiliadoId,
    turno.pacienteId
  );


  const disponibilidad = await Disponibilidad.findByPk(
    turno.disponibilidadId
  );


  const fechaTurno = new Date(
    disponibilidad.fecha
  );

  const ahora = new Date();


  const diferenciaHoras =
    (fechaTurno - ahora) / (1000 * 60 * 60);


  if (diferenciaHoras < 24) {
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
    throw new Error("Turno no encontrado");
  }

  if (turno.estado !== "RESERVADO") {
    throw new Error("Solo se pueden editar turnos reservados");
  }


  await afiliadoService.verificarPermisoGestion(
    afiliadoId,
    turno.pacienteId
  );


  const disponibilidadActual = await Disponibilidad.findByPk(
    turno.disponibilidadId
  );

  const fechaTurno = new Date(disponibilidadActual.fecha);
  const ahora = new Date();

  const diferenciaHoras =
    (fechaTurno - ahora) / (1000 * 60 * 60);

  if (diferenciaHoras < 24) {
    throw new Error(
      "No se puede editar con menos de 24 horas de anticipación"
    );
  }


  if (pacienteId) {

    await afiliadoService.validarAfiliadoActivo(pacienteId);

    await afiliadoService.verificarPermisoGestion(
      afiliadoId,
      pacienteId
    );

    turno.pacienteId = pacienteId;
  }


  if (nuevaDisponibilidadId) {

    const nuevaDisponibilidad = await Disponibilidad.findByPk(
      nuevaDisponibilidadId
    );

    if (!nuevaDisponibilidad) {
      throw new Error("La nueva disponibilidad no existe");
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
  turnoId
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
    throw new Error("Turno no encontrado");
  }

  return turno;
}


async function obtenerTurnosProximos(
  pacienteId
) {

  const ahora = new Date();


  const turnos = await Turno.findAll({

    where: {
      pacienteId,
      estado: "RESERVADO"
    },

    include: {
      model: Disponibilidad,

      where: {
        fecha: {
          [Op.gte]: ahora
        }
      },

      include: {
        model: Profesional,

        include: {
          model: Especialidad
        }
      }
    }

  });


  return turnos;
}


async function obtenerTurnosAnteriores(
  pacienteId
) {

  const ahora = new Date();


  const turnos = await Turno.findAll({

    where: {
      pacienteId,

      [Op.or]: [
        {
          estado: "CANCELADO"
        },
        {
          "$Disponibilidad.fecha$": {
            [Op.lt]: ahora
          }
        }
      ]
    },

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


  return turnos;
}


module.exports = {
  crearTurno,
  cancelarTurno,
  editarTurno,
  obtenerTurnoPorId,
  obtenerTurnosProximos,
  obtenerTurnosAnteriores
};