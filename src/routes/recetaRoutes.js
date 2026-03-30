const express = require("express")
const router = express.Router()

const recetaController = require("../controllers/recetaController")
const validateSchema = require("../middlewares/validateSchema")
const authMiddleware = require("../middlewares/validateSchema")

const {
  createRecetaSchema,
  renovarRecetaSchema
} = require("../schemas/recetaSchema")

// CREAR
router.post(
  "/",
  authMiddleware,
  validateSchema(createRecetaSchema),
  recetaController.crearReceta
)

// RENOVAR
router.put(
  "/renovar/:id",
  authMiddleware,
  validateSchema(renovarRecetaSchema),
  recetaController.renovarReceta
)

// CONSULTAS
router.get(
  "/afiliado/:pacienteId",
  authMiddleware,
  recetaController.obtenerRecetasAfiliado
)

router.get(
  "/:id",
  authMiddleware,
  recetaController.obtenerRecetaPorId
)

module.exports = router