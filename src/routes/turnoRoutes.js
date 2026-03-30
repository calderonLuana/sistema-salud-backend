const express = require("express")
const router = express.Router()

const turnoController = require("../controllers/turnoController")
const validateSchema = require("../middlewares/validateSchema")
const authMiddleware = require("../middlewares/authMiddleware")

const {
  createTurnoSchema,
  cancelarTurnoSchema
} = require("../schemas/turnoSchema")

// CREAR
router.post(
  "/",
  authMiddleware,
  validateSchema(createTurnoSchema),
  turnoController.crearTurno
)

// CANCELAR
router.delete(
  "/:id",
  authMiddleware,
  validateSchema(cancelarTurnoSchema),
  turnoController.cancelarTurno
)

// PROTEGIDOS TAMBIÉN
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