const express = require("express")
const router = express.Router()

const turnoController = require("../controllers/turnoController")
const validateSchema = require("../middlewares/validateSchema")
const authMiddleware = require("../middlewares/authMiddleware")

const {
  createTurnoSchema,
  cancelarTurnoSchema
} = require("../schemas/turnoSchema")

//Crear turno 
router.post(
  "/",
  authMiddleware,
  validateSchema(createTurnoSchema),
  turnoController.crearTurno
)

//Cancelar turno
router.delete(
  "/:id",
  authMiddleware,
  validateSchema(cancelarTurnoSchema),
  turnoController.cancelarTurno
)

//Consultar
router.get(
  "/proximos/:pacienteId",
  authMiddleware,
  turnoController.obtenerTurnosProximos
)

router.get(
  "/historial/:pacienteId",
  authMiddleware,
  turnoController.obtenerTurnosAnteriores
)

module.exports = router