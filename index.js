const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

// Ruta principal
app.get("/", (req, res) => {
  res.json({
    mensaje: "API funcionando correctamente",
    ambiente: process.env.NODE_ENV,
    base_datos: process.env.DB_NAME
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
      mensaje: "Conectada correctamente",
      ambiente: process.env.NODE_ENV,
      base_datos: process.env.DB_NAME
    });

    conexion.end();

  });

});

app.listen(3000, () => {
  console.log(
    `Servidor ejecutándose en ambiente ${process.env.NODE_ENV}`
  );
});