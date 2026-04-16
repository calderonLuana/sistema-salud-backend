const express = require("express")
const router = express.Router()

const profesionalController = require("../controllers/profesionalController")
const validateSchema = require("../middlewares/validateSchema")
const authMiddleware = require("../middlewares/authMiddleware")

const {
  createProfesionalSchema
} = require("../schemas/profesionalSchema")

router.post(
  "/",
  validateSchema(createProfesionalSchema),
  profesionalController.crearProfesional
)

router.get(
  "/",
  profesionalController.listarProfesionales
)

router.get(
  "/:id",
  profesionalController.obtenerProfesional
)

module.exports = router