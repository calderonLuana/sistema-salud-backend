const express = require("express")
const router = express.Router()

const medicamentoController = require("../controllers/medicamentoController")
const validateSchema = require("../middlewares/validateSchema")
const authMiddleware = require("../middlewares/authMiddleware")

//Traer todos
router.get(
  "/",
  medicamentoController.listarMedicamentos
)

//Traer uno 
router.get(
  "/:id",
  medicamentoController.obtenerMedicamento
)

module.exports = router