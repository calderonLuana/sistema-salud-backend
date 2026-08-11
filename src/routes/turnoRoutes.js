const express = require("express");
const router = express.Router();

const turnoController = require("../controllers/turnoController");
const validateSchema = require("../middlewares/validateSchema");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  createTurnoSchema,
  cancelarTurnoSchema
} = require("../schemas/turnoSchema");

// PRUEBA: verificar que los schemas estén llegando correctamente
console.log("CREATE SCHEMA:", createTurnoSchema);
console.log("CANCELAR SCHEMA:", cancelarTurnoSchema);

// Crear turno
router.post(
  "/",
  authMiddleware,
  validateSchema(createTurnoSchema),
  turnoController.crearTurno
);

// Cancelar turno
router.delete(
  "/:id",
  authMiddleware,
  validateSchema(cancelarTurnoSchema),
  turnoController.cancelarTurno
);

// Consultar próximos turnos
router.get(
  "/proximos/:pacienteId",
  authMiddleware,
  turnoController.obtenerTurnosProximos
);

// Consultar historial
router.get(
  "/historial/:pacienteId",
  authMiddleware,
  turnoController.obtenerTurnosAnteriores
);

module.exports = router;