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

router.post("/",authMiddleware,validateSchema(createTurnoSchema),turnoController.crearTurno);
router.delete("/:id",authMiddleware, validateSchema(cancelarTurnoSchema), turnoController.cancelarTurno);
router.patch("/:id", authMiddleware, validateSchema(editarTurnoSchema), turnoController.editarTurno);
router.get( "/proximos/:pacienteId", authMiddleware, turnoController.obtenerTurnosProximos);
router.get( "/historial/:pacienteId", authMiddleware, turnoController.obtenerTurnosAnteriores);
router.get( "/:id",authMiddleware,turnoController.obtenerTurnoPorId);

module.exports = router;