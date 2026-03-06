const express = require("express")
const router = express.Router()
const turnoController = require("../controllers/turnoController")

router.post("/", turnoController.crearTurno)
router.delete("/:id", turnoController.cancelarTurno)
router.get("/proximos/:pacienteId", turnoController.obtenerTurnosProximos)
router.get("/historial/:pacienteId", turnoController.obtenerTurnosAnteriores)

module.exports = router