  const { Turno, Afiliado, Profesional, Disponibilidad } = require('../../models');


  // CREAR TURNO
  const crearTurno = async (req, res) => {
    try {

      const { afiliado_id, profesional_id, disponibilidad_id, fecha } = req.body;

      // validar afiliado
      const afiliado = await Afiliado.findByPk(afiliado_id);
      if (!afiliado) {
        return res.status(404).json({ mensaje: 'Afiliado no existe' });
      }

      // validar profesional
      const profesional = await Profesional.findByPk(profesional_id);
      if (!profesional) {
        return res.status(404).json({ mensaje: 'Profesional no existe' });
      }

      // validar disponibilidad
      const disponibilidad = await Disponibilidad.findByPk(disponibilidad_id);
      if (!disponibilidad) {
        return res.status(404).json({ mensaje: 'Disponibilidad no existe' });
      }

      // validad disponibilidad libre
      const turnoExistente = await Turno.findOne({
        where: {
          disponibilidad_id,
          estado: 'pendiente'
        }
      });

      if (turnoExistente) {
        return res.status(400).json({
          mensaje: 'Esta disponibilidad ya está reservada'
        });
      }

      // validar turno mismo día
      const turnoAfiliadoExistente = await Turno.findOne({
        where: {
          afiliado_id,
          fecha,
          estado: 'pendiente'
        }
      });

      if (turnoAfiliadoExistente) {
        return res.status(400).json({
          mensaje: 'El afiliado ya tiene un turno en esa fecha'
        });
      }

      // crear turno
      const turno = await Turno.create({
        afiliado_id,
        profesional_id,
        disponibilidad_id,
        fecha,
        estado: 'pendiente'
      });

      return res.status(201).json({
        mensaje: 'Turno creado correctamente',
        turno
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        mensaje: 'Error al crear turno',
        error: error.message
      });

    }
  };


  // CONFIRMAR TURNO
  const confirmarTurno = async (req, res) => {
    try {

      const { id } = req.params;

      const turno = await Turno.findByPk(id);

      if (!turno) {
        return res.status(404).json({
          mensaje: 'Turno no encontrado'
        });
      }

      if (turno.estado !== 'pendiente') {
        return res.status(400).json({
          mensaje: 'Solo se pueden confirmar turnos pendientes'
        });
      }

      await turno.update({ estado: 'confirmado' });

      return res.json({
        mensaje: 'Turno confirmado',
        turno
      });

    } catch (error) {

      return res.status(500).json({
        mensaje: 'Error al confirmar turno'
      });

    }
  };


  // COMPLETAR TURNO
  const completarTurno = async (req, res) => {
    try {

      const { id } = req.params;

      const turno = await Turno.findByPk(id);

      if (!turno) {
        return res.status(404).json({
          mensaje: 'Turno no encontrado'
        });
      }

      if (turno.estado !== 'confirmado') {
        return res.status(400).json({
          mensaje: 'Solo se pueden completar turnos confirmados'
        });
      }

      await turno.update({ estado: 'completado' });

      return res.json({
        mensaje: 'Turno completado',
        turno
      });

    } catch (error) {

      console.error("ERROR REAL:", error); 

      return res.status(500).json({
        mensaje: 'Error al completar turno',
        error: error.message 
      });

    }
  };


  // MARCAR AUSENTE
  const marcarAusente = async (req, res) => {
    try {

      const { id } = req.params;

      const turno = await Turno.findByPk(id);

      if (!turno) {
        return res.status(404).json({
          mensaje: 'Turno no encontrado'
        });
      }

      if (turno.estado !== 'confirmado') {
        return res.status(400).json({
          mensaje: 'Solo se pueden marcar ausentes turnos confirmados'
        });
      }

      await turno.update({ estado: 'ausente' });

      return res.json({
        mensaje: 'Turno marcado como ausente',
        turno
      });

    } catch (error) {

      return res.status(500).json({
        mensaje: 'Error al marcar ausente'
      });

    }
  };


  // CANCELAR TURNO
  const cancelarTurno = async (req, res) => {
    try {

      const { id } = req.params;

      const turno = await Turno.findByPk(id);

      if (!turno) {
        return res.status(404).json({
          mensaje: 'Turno no encontrado'
        });
      }

      await turno.update({ estado: 'cancelado' });

      return res.json({
        mensaje: 'Turno cancelado correctamente',
        turno
      });

    } catch (error) {

      return res.status(500).json({
        mensaje: 'Error al cancelar turno'
      });

    }
  };


  // GET TODOS (trae todos)
  const getTurnos = async (req, res) => {
    try {

      const turnos = await Turno.findAll({
        include: [Afiliado, Profesional, Disponibilidad]
      });

      return res.json(turnos);

    } catch (error) {

      return res.status(500).json({
        mensaje: 'Error al obtener turnos'
      });

    }
  };


  // GET POR ID (trae todos de ese ID)
  const getTurnoById = async (req, res) => {
    try {

      const turno = await Turno.findByPk(req.params.id, {
        include: [Afiliado, Profesional, Disponibilidad]
      });

      if (!turno) {
        return res.status(404).json({
          mensaje: 'Turno no encontrado'
        });
      }

      return res.json(turno);

    } catch (error) {

      return res.status(500).json({
        mensaje: 'Error al obtener turno'
      });

    }
  };


  module.exports = {
    crearTurno,
    confirmarTurno,
    completarTurno,
    marcarAusente,
    cancelarTurno,
    getTurnos,
    getTurnoById
  };