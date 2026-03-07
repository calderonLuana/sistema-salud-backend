const express = require("express")
const router = express.Router()

const afiliadoController = require("../controllers/afiliadoController")

router.get("/", afiliadoController.listarAfiliados)

router.post("/registro", afiliadoController.registro)
router.post("/login", afiliadoController.login)

router.get("/:id/grupo", afiliadoController.obtenerGrupoFamiliar)
router.get("/:id", afiliadoController.obtenerAfiliado)

module.exports = router