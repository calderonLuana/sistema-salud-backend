const express = require("express")
const router = express.Router()

const turnoController = require("../controllers/turnoController")
const validateSchema = require("../middlewares/validateSchema")

const {
  createTurnoSchema,
  cancelarTurnoSchema
} = require("../schemas/turnoSchema")

router.post(
  "/",
  validateSchema(createTurnoSchema),
  turnoController.crearTurno
)

router.delete(
  "/:id",
  validateSchema(cancelarTurnoSchema),
  turnoController.cancelarTurno
)

router.get(
  "/proximos/:pacienteId",
  turnoController.obtenerTurnosProximos
)

router.get(
  "/historial/:pacienteId",
  turnoController.obtenerTurnosAnteriores
)

module.exports = router