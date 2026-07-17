# Sistema de Gestión de Afiliados y Grupo Familiar (LAV) - Backend

Backend desarrollado con **Node.js**, **Express**, **Sequelize** y **MySQL** para la gestión de afiliados de una obra social.

El sistema permite administrar el acceso de afiliados y grupos familiares, gestionar turnos médicos y recetas, aplicando reglas de negocio reales y control de permisos según el rol del afiliado.

<p align="center">
  <img src="./docs/LogoLav.jpg" alt="Logo LAV" width="250">
</p>

---

# Características

- Registro e inicio de sesión de afiliados.
- Gestión de grupos familiares.
- Reserva y cancelación de turnos médicos.
- Solicitud y renovación de recetas médicas.

---

# Tecnologías

## Backend

- Node.js
- Express
- Sequelize
- MySQL
- JWT
- Joi

## Herramientas

- Sequelize CLI
- Thunder Client
- Git
- GitHub
- Nodemon

---

# Arquitectura

El proyecto fue organizado siguiendo una arquitectura en capas para separar responsabilidades, facilitando el mantenimiento y la escalabilidad del sistema.

## Estructura del proyecto

```text
SISTEMA_SALUD_BACKEND
│
├── config/
│   └── config.json
│
├── migrations/
│   ├── create-grupo-familiar.js
│   ├── create-afiliado.js
│   ├── create-especialidad.js
│   ├── create-profesional.js
│   ├── create-disponibilidad.js
│   ├── create-turno.js
│   ├── create-medicamento.js
│   └── create-receta.js
│
├── models/
│   ├── index.js
│   ├── afiliado.js
│   ├── disponibilidad.js
│   ├── especialidad.js
│   ├── grupofamiliar.js
│   ├── medicamento.js
│   ├── profesional.js
│   ├── receta.js
│   └── turno.js
│
├── seeders/
│   ├── demo-afiliados.js
│   ├── demo-especialidades.js
│   ├── demo-profesionales.js
│   ├── demo-disponibilidades.js
│   └── demo-medicamentos.js
│
├── src/
│   ├── controllers/
│   │   ├── afiliadoController.js
│   │   ├── disponibilidadController.js
│   │   ├── especialidadController.js
│   │   ├── medicamentoController.js
│   │   ├── profesionalController.js
│   │   ├── recetaController.js
│   │   └── turnoController.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── validateSchema.js
│   │
│   ├── routes/
│   │   ├── afiliadoRoutes.js
│   │   ├── disponibilidadRoutes.js
│   │   ├── especialidadRoutes.js
│   │   ├── medicamentoRoutes.js
│   │   ├── profesionalRoutes.js
│   │   ├── recetaRoutes.js
│   │   └── turnoRoutes.js
│   │
│   ├── schemas/
│   │   ├── afiliadoSchema.js
│   │   ├── disponibilidadSchema.js
│   │   ├── especialidadSchema.js
│   │   ├── medicamentoSchema.js
│   │   ├── profesionalSchema.js
│   │   ├── recetaSchema.js
│   │   └── turnoSchema.js
│   │
│   ├── services/
│   │   ├── afiliadoService.js
│   │   ├── disponibilidadService.js
│   │   ├── especialidadService.js
│   │   ├── medicamentoService.js
│   │   ├── profesionalService.js
│   │   ├── recetaService.js
│   │   └── turnoService.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

La arquitectura implementada separa claramente las responsabilidades del sistema:

- **Controllers:** reciben las solicitudes HTTP y devuelven las respuestas.
- **Services:** concentran toda la lógica de negocio.
- **Routes:** definen los endpoints de la API.
- **Middlewares:** gestionan la autenticación mediante JWT y la validación de datos.
- **Schemas:** validan la información de entrada utilizando Joi.
- **Models:** representan las entidades mediante Sequelize.
- **Migrations:** administran la estructura de la base de datos.
- **Seeders:** cargan datos iniciales para pruebas y desarrollo.

---

# Funcionalidades

## Afiliados

- Registro de afiliados previamente cargados por la empresa.
- Inicio de sesión mediante autenticación JWT.
- Consulta de información personal.
- Consulta del grupo familiar respetando los permisos del afiliado.

## Turnos

- Reserva de turnos médicos.
- Cancelación de turnos.
- Consulta de próximos turnos.

## Recetas

- Solicitud de recetas médicas.
- Renovación de recetas.
- Consulta de recetas por afiliado.
- Consulta individual de recetas.

---

# Base de datos

La persistencia se implementó utilizando **MySQL** junto con **Sequelize ORM**.

El modelo contempla las siguientes entidades:

- Grupo Familiar
- Afiliados
- Profesionales
- Especialidades
- Disponibilidades
- Turnos
- Medicamentos
- Recetas


---

# Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/sistema-salud-backend.git
```

### 2. Ingresar al directorio

```bash
cd sistema-salud-backend
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Crear el archivo `.env`

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=sistema_salud

JWT_SECRET=tu_clave_secreta
```

### 5. Ejecutar las migraciones

```bash
npx sequelize-cli db:migrate
```

### 6. Cargar los datos iniciales

```bash
npx sequelize-cli db:seed:all
```

### 7. Iniciar el servidor

```bash
npm run dev
```

---

# Endpoints principales

## Afiliados

```http
POST /afiliados/register
POST /afiliados/login
GET  /afiliados
GET  /afiliados/:id
GET  /afiliados/grupo-familiar
```

## Turnos

```http
POST   /turnos
DELETE /turnos/:id
GET    /turnos/proximos
GET    /turnos/historial
```

## Recetas

```http
POST /recetas
PUT  /recetas/renovar/:id
GET  /recetas
GET  /recetas/:id
```


## Autora

**Luana Calderón**

Proyecto desarrollado como parte de mi portfolio de desarrollo backend.