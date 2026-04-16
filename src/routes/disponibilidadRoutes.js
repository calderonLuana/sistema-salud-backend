const express = require("express")
const router = express.Router()

const disponibilidadController = require("../controllers/disponibilidadController")
const validateSchema = require("../middlewares/validateSchema")
const authMiddleware = require("../middlewares/authMiddleware")

const {
  createDisponibilidadSchema
} = require("../schemas/disponibilidadSchema")

router.post(
  "/",
  validateSchema(createDisponibilidadSchema),
  disponibilidadController.listarDisponibilidades // podés cambiar si agregás create
)

router.get(
  "/",
  disponibilidadController.listarDisponibilidades
)

router.get(
  "/libres",
  disponibilidadController.listarDisponibilidadesLibres
)

router.get(
  "/:id",
  disponibilidadController.obtenerDisponibilidad
)

module.exports = router