const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

// Ruta principal
app.get("/", (req, res) => {
  res.json({
    mensaje: "API funcionando correctamente"
  });
});

// Ruta para probar BD
app.get("/db", (req, res) => {

  const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  conexion.query("SELECT 1", (err) => {

    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json({
      base_datos: "Conectada correctamente"
    });

    conexion.end();
  });

});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});