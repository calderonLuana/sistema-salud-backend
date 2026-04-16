const express = require("express");
const afiliadoRoutes = require("./routes/afiliadoRoutes")
const recetaRoutes = require("./routes/recetaRoutes")
const turnoRoutes = require("./routes/turnoRoutes")
const especialidadRoutes = require("./routes/especialidadRoutes")
const profesionalRoutes = require("./routes/profesionalRoutes")
const disponibilidadRoutes = require("./routes/disponibilidadRoutes")
const medicamentoRoutes = require("./routes/medicamentoRoutes")

require("dotenv").config()


const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// Rutas
app.use("/afiliados", afiliadoRoutes)
app.use("/recetas", recetaRoutes)
app.use("/turnos", turnoRoutes)
app.use("/especialidades", especialidadRoutes)
app.use("/profesionales", profesionalRoutes)
app.use("/disponibilidad", disponibilidadRoutes)
app.use("/medicamento", medicamentoRoutes)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});