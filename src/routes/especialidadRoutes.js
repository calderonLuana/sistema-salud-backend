const express = require("express")
const router = express.Router()

const especialidadController = require("../controllers/especialidadController")
const authMiddleware = require("../middlewares/authMiddleware")

router.get(
  "/",
  especialidadController.listarEspecialidades
)

router.get(
  "/:id",
  especialidadController.obtenerEspecialidad
)

module.exports = router