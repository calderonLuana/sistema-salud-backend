const express = require("express");
const turnoRoutes = require("./routes/turnoRoutes");

const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// Rutas
app.use("/api/turnos", turnoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});