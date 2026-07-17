const express = require("express")
const router = express.Router()

const afiliadoController = require("../controllers/afiliadoController")
const validateSchema = require("../middlewares/validateSchema")
const authMiddleware = require("../middlewares/authMiddleware")

const {
  registroSchema,
  loginSchema
} = require("../schemas/afiliadoSchema")

// Registro
router.post(
  "/registro",
  validateSchema(registroSchema),
  afiliadoController.registro
)

// Login
router.post(
  "/login",
  validateSchema(loginSchema),
  afiliadoController.login
)

// Traer grupo familiar
router.get(
  "/grupo/:id",
  afiliadoController.obtenerGrupoFamiliar
)

// Traer datos de grupo familiar
router.get(
  "/",
  afiliadoController.listarAfiliados
)

// Traer un afiliado
router.get(
  "/:id",
  afiliadoController.obtenerAfiliado
)

module.exports = router