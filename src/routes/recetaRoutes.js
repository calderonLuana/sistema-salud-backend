const express = require("express")
const router = express.Router()

const recetaController = require("../controllers/recetaController")

router.post("/", recetaController.crearReceta)
router.post("/:id/renovar", recetaController.renovarReceta)
router.get("/paciente/:pacienteId", recetaController.obtenerRecetasPaciente)
router.get("/:id", recetaController.obtenerRecetaPorId)

module.exports = router