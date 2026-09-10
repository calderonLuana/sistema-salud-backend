const { Receta, Medicamento } = require("../../models")
const afiliadoService = require("./afiliadoService")
const { Op } = require("sequelize")


async function crearReceta(solicitanteId, pacienteId, medicamentoId, datosReceta) {


  await afiliadoService.validarAfiliadoActivo(solicitanteId)
  await afiliadoService.validarAfiliadoActivo(pacienteId)


  await afiliadoService.verificarPermisoGestion(
    solicitanteId,
    pacienteId
  )


  const medicamento = await Medicamento.findByPk(medicamentoId)


  if (!medicamento) {
    throw new Error("Medicamento no existe")
  }


  // Validar receta pendiente o aprobada (no puede haber 2 activas a la vez)
  const recetaActiva = await Receta.findOne({
    where: {
      pacienteId,
      medicamentoId,
      estado: {
        [Op.in]: ["PENDIENTE", "APROBADA"]
      }
    }
  })


  if (recetaActiva) {
    throw new Error(
      "Ya existe una receta pendiente o aprobada para este medicamento"
    )
  }


  const inicioMes = new Date()
  inicioMes.setDate(1)
  inicioMes.setHours(0, 0, 0, 0)


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


  // Crear receta (armado explícito, sin spread del body completo)
  const receta = await Receta.create({
    solicitanteId,
    pacienteId,
    medicamentoId,
    presentacion: datosReceta.presentacion,
    cantidadComprimidos: datosReceta.cantidadComprimidos,
    cantidad: datosReceta.cantidad,
    observaciones: datosReceta.observaciones,
    estado: "PENDIENTE"
  })


  return receta
}


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


  const inicioMes = new Date()
  inicioMes.setDate(1)
  inicioMes.setHours(0, 0, 0, 0)


  const recetasMes = await Receta.count({
    where: {
      pacienteId: receta.pacienteId,
      medicamentoId: receta.medicamentoId,
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
      pacienteId: receta.pacienteId,
      medicamentoId: receta.medicamentoId,
      fechaSolicitud: {
        [Op.gte]: inicioAño
      }
    }
  })


  if (recetasAño >= 13) {
    throw new Error("Máximo 13 recetas por año para este medicamento")
  }


  receta.cantidad = datos.cantidad ?? receta.cantidad
  receta.observaciones = datos.observaciones ?? receta.observaciones


  receta.estado = "PENDIENTE"
  receta.fechaSolicitud = new Date()


  await receta.save()


  return receta
}


async function obtenerRecetasAfiliado(solicitanteId, pacienteId) {


  await afiliadoService.verificarPermisoVisualizacion(
    solicitanteId,
    pacienteId
  )


  const recetas = await Receta.findAll({
    where: { pacienteId },


    include: [
      {
        model: Medicamento,
        as: "medicamento",
        attributes: ["id", "nombre"]
      }
    ],


    order: [["fechaSolicitud", "DESC"]]
  })


  return recetas
}


async function obtenerRecetaPorId(recetaId, solicitanteId) {


  const receta = await Receta.findByPk(recetaId, {
    include: [
      {
        model: Medicamento,
        as: "medicamento",
        attributes: ["id", "nombre"]
      }
    ]
  })


  if (!receta) {
    throw new Error("Receta no encontrada")
  }


  await afiliadoService.verificarPermisoVisualizacion(
    solicitanteId,
    receta.pacienteId
  )


  return receta
}


module.exports = {
  crearReceta,
  renovarReceta,
  obtenerRecetasAfiliado,
  obtenerRecetaPorId
}