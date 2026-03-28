const express = require("express")
const router = express.Router()

const recetaController = require("../controllers/recetaController")
const validateSchema = require("../middlewares/validateSchema")

const {
  createRecetaSchema,
  renovarRecetaSchema
} = require("../schemas/recetaSchema")

router.post(
  "/",
  validateSchema(createRecetaSchema),
  recetaController.crearReceta
)

router.put(
  "/renovar/:id",
  validateSchema(renovarRecetaSchema),
  recetaController.renovarReceta
)

router.get(
  "/afiliado/:pacienteId",
  recetaController.obtenerRecetasAfiliado
)

router.get(
  "/:id",
  recetaController.obtenerRecetaPorId
)

module.exports = router