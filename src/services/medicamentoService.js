const { Medicamento } = require("../../models")

async function crearMedicamento(nombre) {

  const existe = await Medicamento.findOne({
    where: { nombre }
  })

  if (existe) {
    throw new Error("El medicamento ya existe")
  }

  const medicamento = await Medicamento.create({ nombre })

  return medicamento
}

async function obtenerMedicamentos() {

  const medicamentos = await Medicamento.findAll({
    order: [["nombre", "ASC"]]
  })

  return medicamentos
}

module.exports = {
  crearMedicamento,
  obtenerMedicamentos
}