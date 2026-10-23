// Utilidades de fecha y hora para turnos y disponibilidades.
// Una disponibilidad guarda la fecha (DATEONLY) y la hora (TIME) por separado.
// La fecha y hora se interpretan con la zona horaria del servidor.

function fechaHoraDeDisponibilidad(disponibilidad) {
  const fechaHora = new Date(
    `${disponibilidad.fecha}T${disponibilidad.hora}`
  );

  if (Number.isNaN(fechaHora.getTime())) {
    throw new Error("La fecha u hora del turno no es válida");
  }

  return fechaHora;
}

// Horas que faltan para la disponibilidad (negativo si ya pasó)
function horasHasta(disponibilidad) {
  return (
    (fechaHoraDeDisponibilidad(disponibilidad) - new Date()) /
    (1000 * 60 * 60)
  );
}

function yaPaso(disponibilidad) {
  return fechaHoraDeDisponibilidad(disponibilidad) <= new Date();
}

module.exports = {
  fechaHoraDeDisponibilidad,
  horasHasta,
  yaPaso
};