const express = require("express")
const router = express.Router()
const recetaController = require("../controllers/recetaController")

router.post("/", recetaController.crearReceta)
router.put("/renovar/:id", recetaController.renovarReceta)
router.get("/afiliado/:pacienteId", recetaController.obtenerRecetasAfiliado)
router.get("/:id", recetaController.obtenerRecetaPorId)

module.exports = router