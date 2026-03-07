const { Afiliado, GrupoFamiliar } = require("../../models");

function calcularEdad(fechaNacimiento) {
  const hoy = new Date()
  const nacimiento = new Date(fechaNacimiento)

  let edad = hoy.getFullYear() - nacimiento.getFullYear()
  const mes = hoy.getMonth() - nacimiento.getMonth()

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--
  }

  return edad
}

async function validarAfiliadoActivo(afiliadoId) {

  const afiliado = await Afiliado.findByPk(afiliadoId)

  if (!afiliado) {
    throw new Error("Afiliado no existe")
  }

if (afiliado.estado !== "ACTIVO") {
  throw new Error("Afiliado inactivo")
}

  return afiliado
}

async function validarRegistro(afiliadoId) {

  const afiliado = await Afiliado.findByPk(afiliadoId)

  if (!afiliado) {
    throw new Error("Afiliado no existe")
  }

  const edad = calcularEdad(afiliado.fechaNacimiento)

  if (edad < 16) {
    throw new Error("Debe tener al menos 16 años para registrarse")
  }

  return afiliado
}

async function verificarPermisoGestion(solicitanteId, pacienteId) {

  const solicitante = await Afiliado.findByPk(solicitanteId)
  const paciente = await Afiliado.findByPk(pacienteId)

  if (!solicitante || !paciente) {
    throw new Error("Afiliado no encontrado")
  }

  // gestion de sí mismo
  if (solicitante.id === paciente.id) {
    return true
  }

  if (solicitante.grupoFamiliarId !== paciente.grupoFamiliarId) {
    throw new Error("No pertenecen al mismo grupo familiar")
  }

  const edadPaciente = calcularEdad(paciente.fechaNacimiento)

  // adultos pueden gestionar menores
  if (edadPaciente < 18 && solicitante.tipo === "titular") {
    return true
  }

  throw new Error("No tiene permisos para gestionar este afiliado")
}

module.exports = {
  calcularEdad,
  validarAfiliadoActivo,
  validarRegistro,
  verificarPermisoGestion
}