function fechaHoraDeDisponibilidad(disponibilidad) {
  const fechaHora = new Date(
    `${disponibilidad.fecha}T${disponibilidad.hora}`
  );

  if (Number.isNaN(fechaHora.getTime())) {
    throw new Error("La fecha u hora del turno no es válida");
  }

  return fechaHora;
}

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