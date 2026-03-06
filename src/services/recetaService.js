const { Receta } = require("../../models")
const afiliadoService = require("./afiliadoService")
const { Op } = require("sequelize")

async function crearReceta(solicitanteId, pacienteId, medicamentoId, datosReceta) {

  await afiliadoService.validarAfiliadoActivo(solicitanteId)

  await afiliadoService.verificarPermisoGestion(solicitanteId, pacienteId)

  const inicioMes = new Date()
  inicioMes.setDate(1)
  inicioMes.setHours(0,0,0,0)

  const recetaPendiente = await Receta.findOne({
    where: {
      pacienteId,
      medicamentoId,
      estado: "PENDIENTE",
      fechaSolicitud: {
        [Op.gte]: inicioMes
      }
    }
  })

  if (recetaPendiente) {
    throw new Error("Ya existe una receta pendiente para este medicamento")
  }

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

  return Receta.create({
    solicitanteId,
    pacienteId,
    medicamentoId,
    ...datosReceta,
    estado: "PENDIENTE"
  })
}

async function renovarReceta(recetaId, solicitanteId, datosRenovacion) {

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

  const fechaRenovacion = new Date(receta.fechaSolicitud)
  fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 1)

  if (new Date() < fechaRenovacion) {
    throw new Error("La receta solo puede renovarse después de 1 mes")
  }

  receta.cantidad = datosRenovacion.cantidad ?? receta.cantidad
  receta.observaciones = datosRenovacion.observaciones ?? receta.observaciones

  receta.estado = "PENDIENTE"
  receta.fechaSolicitud = new Date()

  await receta.save()

  return receta
}

async function obtenerRecetasAfiliado(afiliadoId) {

  return Receta.findAll({
    where: {
      pacienteId: afiliadoId
    },
    order: [["fechaSolicitud", "DESC"]]
  })
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