const { Afiliado, GrupoFamiliar } = require("../../models")
const afiliadoService = require("../services/afiliadoService")

async function registro(req, res) {
  try {

    const { dni, password, confirmarPassword } = req.body

    if (password !== confirmarPassword) {
      return res.status(400).json({
        error: "Las contraseñas no coinciden"
      })
    }

    const afiliado = await Afiliado.findOne({
  where: { dni }
})

if (!afiliado) {
  return res.status(404).json({
    error: "Afiliado no encontrado"
  })
}

if (afiliado.registrado) {
  return res.status(400).json({
    error: "El afiliado ya está registrado"
  })
}

    await afiliadoService.validarRegistro(afiliado.id)

    afiliado.password = password
    afiliado.registrado = true

    await afiliado.save()

    res.json({
      message: "Registro completado"
    })

  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}


async function listarAfiliados(req, res) {

  try {

    const afiliados = await Afiliado.findAll()

    res.json(afiliados)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }

}

async function login(req, res) {

  try {

    const { dni, password } = req.body

    const afiliado = await Afiliado.findOne({
      where: { dni }
    })

    if (!afiliado) {
      return res.status(404).json({
        error: "Afiliado no encontrado"
      })
    }

    if (!afiliado.registrado) {
      return res.status(403).json({
        error: "Debe completar el registro"
      })
    }

  if (afiliado.estado !== "ACTIVO") {
  return res.status(403).json({
    error: "Afiliado inactivo"
  })
}

    if (afiliado.password !== password) {
      return res.status(401).json({
        error: "Contraseña incorrecta"
      })
    }

   res.json({
  message: "Login correcto",
  afiliado: {
    id: afiliado.id,
    nombre: afiliado.nombre,
    dni: afiliado.dni,
    grupoFamiliarId: afiliado.grupoFamiliarId
  }
})

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }
}


async function obtenerAfiliado(req, res) {

  try {

    const { id } = req.params

    const afiliado = await Afiliado.findByPk(id)

    if (!afiliado) {
      return res.status(404).json({
        error: "Afiliado no encontrado"
      })
    }

    res.json(afiliado)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }
}


async function obtenerGrupoFamiliar(req, res) {

  try {

    const { id } = req.params

   const afiliado = await Afiliado.findByPk(id, {
  include: {
    model: GrupoFamiliar,
    include: Afiliado
  }
})

res.json(afiliado.GrupoFamiliar)
  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }
}


module.exports = {
  registro,
  login,
  obtenerAfiliado,
  obtenerGrupoFamiliar,
  listarAfiliados,  
}

