const express = require('express');
const router = express.Router();

const turnoController = require('../controllers/turnoController');

router.post('/', turnoController.crearTurno);
router.get('/', turnoController.getTurnos);
router.get('/:id', turnoController.getTurnoById);
router.put('/:id/cancelar', turnoController.cancelarTurno);


module.exports = router;