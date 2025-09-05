// server.js
const express = require("express");
const client = require("./main");
require("dotenv").config();

const app = express();
app.use(express.json());

// Middleware de validación
function validateToken(req, res, next) {
  const token = req.headers["x-api-key"];
  if (token && token === process.env.N8N_TOKEN) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

// Endpoint para enviar a tu canal
app.post("/send-message", validateToken, async (req, res) => {
  const { message, channel } = req.body;
  if (!message) {
    return res.status(400).json({ error: "message requerido" });
  }

  try {
    // Usamos el channelId fijo desde env
    const channelId = channel;
    const sentMsg = await client.sendMessage(channelId, message);

    res.json({
      status: "ok",
      id: sentMsg.id.id,
      message: sentMsg.body,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
