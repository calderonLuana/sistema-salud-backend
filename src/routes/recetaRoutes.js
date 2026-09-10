const express = require("express")
const router = express.Router()

const recetaController = require("../controllers/recetaController")
const validateSchema = require("../middlewares/validateSchema")
const authMiddleware = require("../middlewares/authMiddleware")

const {
  createRecetaSchema,
  renovarRecetaSchema
} = require("../schemas/recetaSchema")

router.post("/", authMiddleware, validateSchema(createRecetaSchema), recetaController.crearReceta)
router.put("/renovar/:id", authMiddleware, validateSchema(renovarRecetaSchema), recetaController.renovarReceta)
router.get( "/afiliado/:pacienteId", authMiddleware, recetaController.obtenerRecetasAfiliado)
router.get("/:id",authMiddleware,recetaController.obtenerRecetaPorId)

module.exports = router