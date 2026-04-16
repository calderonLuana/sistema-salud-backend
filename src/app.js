const express = require('express');
require("dotenv").config()

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Sistema Salud funcionando 🚀' });
});

module.exports = app;