const express = require("express")
const router = express.Router()

const medicamentoController = require("../controllers/medicamentoController")

// Listar todos
router.get(
  "/",
  medicamentoController.listarMedicamentos
)

// Obtener uno
router.get(
  "/:id",
  medicamentoController.obtenerMedicamento
)

module.exports = router