const express = require("express");
const router = express.Router();

const turnoController = require("../controllers/turnoController");
const validateSchema = require("../middlewares/validateSchema");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  createTurnoSchema,
  cancelarTurnoSchema,
  editarTurnoSchema
} = require("../schemas/turnoSchema");

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

// Editar turno
router.patch(
  "/:id",
  authMiddleware,
  validateSchema(editarTurnoSchema),
  turnoController.editarTurno
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

// Consultar un turno puntual
router.get(
  "/:id",
  authMiddleware,
  turnoController.obtenerTurnoPorId
);

module.exports = router;