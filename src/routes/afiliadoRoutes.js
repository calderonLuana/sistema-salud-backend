const express = require("express")
const router = express.Router()

const afiliadoController = require("../controllers/afiliadoController")

router.post("/registro", afiliadoController.registro)
router.post("/login", afiliadoController.login)
router.get("/:id", afiliadoController.obtenerAfiliado)
router.get("/:id/grupo", afiliadoController.obtenerGrupoFamiliar)

module.exports = router