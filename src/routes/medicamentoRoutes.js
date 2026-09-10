const express = require("express")
const router = express.Router()

const medicamentoController = require("../controllers/medicamentoController")
const validateSchema = require("../middlewares/validateSchema")
const authMiddleware = require("../middlewares/authMiddleware")

router.get( "/", medicamentoController.listarMedicamentos)
router.get( "/:id", medicamentoController.obtenerMedicamento)

module.exports = router