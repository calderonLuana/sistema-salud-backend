const { Turno, Disponibilidad } = require("../../models")
const afiliadoService = require("./afiliadoService")

async function crearTurno(solicitanteId, pacienteId, disponibilidadId) {

  await afiliadoService.validarAfiliadoActivo(solicitanteId)

  await afiliadoService.verificarPermisoGestion(solicitanteId, pacienteId)

  const disponibilidad = await Disponibilidad.findByPk(disponibilidadId)

  if (!disponibilidad) {
    throw new Error("Disponibilidad no existe")
  }

  const turnoExistente = await Turno.findOne({
    where: { disponibilidadId }
  })

  if (turnoExistente) {
    throw new Error("La disponibilidad ya está reservada")
  }

  const turno = await Turno.create({
    solicitanteId,
    pacienteId,
    disponibilidadId,
    estado: "reservado"
  })

  return turno
}

async function cancelarTurno(turnoId, afiliadoId) {

  const turno = await Turno.findByPk(turnoId)

  if (!turno) {
    throw new Error("Turno no encontrado")
  }

  await afiliadoService.verificarPermisoGestion(
    afiliadoId,
    turno.pacienteId
  )

  const disponibilidad = await Disponibilidad.findByPk(turno.disponibilidadId)

  const fechaTurno = new Date(disponibilidad.fecha)
  const ahora = new Date()

  const diferenciaHoras = (fechaTurno - ahora) / (1000 * 60 * 60)

  if (diferenciaHoras < 24) {
    throw new Error("No se puede cancelar con menos de 24 horas")
  }

  turno.estado = "cancelado"

  await turno.save()

  return turno
}

module.exports = {
  crearTurno,
  cancelarTurno
}