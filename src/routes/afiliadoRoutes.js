const express = require("express")
const router = express.Router()

const afiliadoController = require("../controllers/afiliadoController")
const validateSchema = require("../middlewares/validateSchema")
const {
  registroSchema,
  loginSchema
} = require("../schemas/afiliadoSchema")

// REGISTRO
router.post(
  "/registro",
  validateSchema(registroSchema),
  afiliadoController.registro
)

// LOGIN
router.post(
  "/login",
  validateSchema(loginSchema),
  afiliadoController.login
)

// GRUPO FAMILIAR (antes que :id)
router.get(
  "/grupo/:id",
  afiliadoController.obtenerGrupoFamiliar
)

// LISTAR
router.get(
  "/",
  afiliadoController.listarAfiliados
)

// OBTENER UNO
router.get(
  "/:id",
  afiliadoController.obtenerAfiliado
)

module.exports = router