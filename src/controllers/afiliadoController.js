const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
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
// Se corrigio validacion de edad
    try {
  await afiliadoService.validarRegistro(afiliado.id)
} catch (error) {
  return res.status(400).json({
    error: error.message
  })
}

    const hashedPassword = await bcrypt.hash(password, 10)
    
    afiliado.password = hashedPassword
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

    //que coincidan las contraseñas 
    const passwordValida = await bcrypt.compare(password, afiliado.password)

    if (!passwordValida) {
      return res.status(401).json({
        error: "Contraseña incorrecta"
      })
    }

    //generar token
    const token = jwt.sign(
      {
        id: afiliado.id,
        tipo: afiliado.tipoAfiliado
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES
      }
    )

    res.json({
      message: "Login correcto",
      token,
      afiliado: {
        id: afiliado.id,
        nombre: afiliado.nombre,
        dni: afiliado.dni
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

