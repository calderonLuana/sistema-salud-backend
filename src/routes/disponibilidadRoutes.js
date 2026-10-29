const express = require("express")
const router = express.Router()

const disponibilidadController = require("../controllers/disponibilidadController")
const validateSchema = require("../middlewares/validateSchema")
const authMiddleware = require("../middlewares/authMiddleware")

const {
  createDisponibilidadSchema
} = require("../schemas/disponibilidadSchema")


router.post("/", authMiddleware, validateSchema(createDisponibilidadSchema), disponibilidadController.listarDisponibilidades)

router.get("/", authMiddleware, disponibilidadController.listarDisponibilidades)

router.get("/libres", authMiddleware, disponibilidadController.listarDisponibilidadesLibres)

router.get("/:id", authMiddleware, disponibilidadController.obtenerDisponibilidad)

module.exports = router