const express = require("express");
const afiliadoRoutes = require("./routes/afiliadoRoutes")
const recetaRoutes = require("./routes/recetaRoutes")

const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// Rutas
app.use("/afiliados", afiliadoRoutes)
app.use("/recetas", recetaRoutes)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});