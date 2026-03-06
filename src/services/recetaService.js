const { Receta } = require("../../models")
const afiliadoService = require("./afiliadoService")
const { Op } = require("sequelize")

async function crearReceta(solicitanteId, pacienteId, medicamentoId, datosReceta) {

  await afiliadoService.validarAfiliadoActivo(solicitanteId)

  await afiliadoService.verificarPermisoGestion(
    solicitanteId,
    pacienteId
  )

  const recetaPendiente = await Receta.findOne({
    where: {
      pacienteId,
      medicamentoId,
      estado: "PENDIENTE"
    }
  })

  if (recetaPendiente) {
    throw new Error("Ya existe una receta pendiente para este medicamento")
  }

  const inicioMes = new Date()
  inicioMes.setDate(1)
  inicioMes.setHours(0,0,0,0)

  const recetasMes = await Receta.count({
    where: {
      pacienteId,
      medicamentoId,
      fechaSolicitud: {
        [Op.gte]: inicioMes
      }
    }
  })

  if (recetasMes >= 2) {
    throw new Error("Máximo 2 recetas por mes para este medicamento")
  }

  const inicioAño = new Date(new Date().getFullYear(), 0, 1)

  const recetasAño = await Receta.count({
    where: {
      pacienteId,
      medicamentoId,
      fechaSolicitud: {
        [Op.gte]: inicioAño
      }
    }
  })

  if (recetasAño >= 13) {
    throw new Error("Máximo 13 recetas por año para este medicamento")
  }

  const receta = await Receta.create({
    solicitanteId,
    pacienteId,
    medicamentoId,
    ...datosReceta,
    estado: "PENDIENTE"
  })

  return receta
}


//Consultar ya que si no puede renovar no es necesario el mensaje ya que no va a poder acceder.

async function renovarReceta(recetaId, solicitanteId, datos) {

  const receta = await Receta.findByPk(recetaId)

  if (!receta) {
    throw new Error("Receta no encontrada")
  }

  await afiliadoService.validarAfiliadoActivo(solicitanteId)

  await afiliadoService.verificarPermisoGestion(
    solicitanteId,
    receta.pacienteId
  )

  if (receta.estado !== "APROBADA") {
    throw new Error("Solo se pueden renovar recetas aprobadas")
  }

  const hoy = new Date()
  const fechaReceta = new Date(receta.fechaSolicitud)

  const diferenciaMeses =
    (hoy.getFullYear() - fechaReceta.getFullYear()) * 12 +
    (hoy.getMonth() - fechaReceta.getMonth())

  if (diferenciaMeses < 1) {
    throw new Error("La receta solo puede renovarse después de 1 mes")
  }

  receta.cantidad = datos.cantidad ?? receta.cantidad
  receta.observaciones = datos.observaciones ?? receta.observaciones

  receta.estado = "PENDIENTE"
  receta.fechaSolicitud = new Date()

  await receta.save()

  return receta
}

async function obtenerRecetasAfiliado(pacienteId) {

  const recetas = await Receta.findAll({
    where: { pacienteId },
    order: [["fechaSolicitud", "DESC"]]
  })

  return recetas
}

async function obtenerRecetaPorId(recetaId) {

  const receta = await Receta.findByPk(recetaId)

  if (!receta) {
    throw new Error("Receta no encontrada")
  }

  return receta
}

module.exports = {
  crearReceta,
  renovarReceta,
  obtenerRecetasAfiliado,
  obtenerRecetaPorId
}