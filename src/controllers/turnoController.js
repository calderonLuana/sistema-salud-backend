    const { Turno, Afiliado, Profesional, Disponibilidad } = require('../../models');

      const crearTurno = async (req, res) => {
    try {

      const { afiliado_id, profesional_id, disponibilidad_id, fecha } = req.body;

      const afiliado = await Afiliado.findByPk(afiliado_id);

      if (!afiliado) {
        return res.status(404).json({
          mensaje: 'Afiliado no existe'
        });
      }

      const profesional = await Profesional.findByPk(profesional_id);

      if (!profesional) {
        return res.status(404).json({
          mensaje: 'Profesional no existe'
        });
      }

      const disponibilidad = await Disponibilidad.findByPk(disponibilidad_id);

      if (!disponibilidad) {
        return res.status(404).json({
          mensaje: 'Disponibilidad no existe'
        });
      }

      const turnoExistente = await Turno.findOne({
        where: { disponibilidad_id }
      });

      if (turnoExistente) {
        return res.status(400).json({
          mensaje: 'Esta disponibilidad ya está reservada'
        });
      }

      const turno = await Turno.create({
        afiliado_id,
        profesional_id,
        disponibilidad_id,
        fecha,
        estado: 'pendiente'
      });

      res.status(201).json(turno);

    } catch (error) {

      res.status(500).json({
        mensaje: 'Error al crear turno',
        error: error.message
      });

    }
  };


          const getTurnos = async (req, res) => {
      try {
        const turnos = await Turno.findAll({
          include: [
            {
              model: Afiliado
            },
            {
              model: Profesional
            },
            {
              model: Disponibilidad
            }
          ]
        });

        res.json(turnos);

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener turnos' });
      }
    };

          const getTurnoById = async (req, res) => {
      try {
        const turno = await Turno.findByPk(req.params.id, {
          include: [
            { model: Afiliado },
            { model: Profesional },
            { model: Disponibilidad }
          ]
        });

        if (!turno) {
          return res.status(404).json({ error: 'Turno no encontrado' });
        }

        res.json(turno);

      } catch (error) {
        res.status(500).json({ error: 'Error al obtener turno' });
      }
    };


            const cancelarTurno = async (req, res) => {
        try {

            const { id } = req.params;

            const turno = await Turno.findByPk(id);

            if (!turno) {
            return res.status(404).json({
                mensaje: 'Turno no encontrado'
            });
            }

            await turno.update({
            estado: 'cancelado'
            });

            res.json({
            mensaje: 'Turno cancelado correctamente',
            turno
            });

        } catch (error) {

            res.status(500).json({
            mensaje: 'Error al cancelar turno',
            error: error.message
            });

        }
        };
    module.exports = {
    crearTurno,
    getTurnos,
     getTurnoById,
     cancelarTurno
};
            