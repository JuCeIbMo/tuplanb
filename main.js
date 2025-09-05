// main.js
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");


const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: '/sessions', // Directory for storing sessions
  }),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});


client.on("qr", (qr) => {
  console.log("Escanea este QR con tu WhatsApp:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  console.log("✅ WhatsApp client listo");

  // SOLO una vez: listar canales y obtener el ID
  // Esto te da el listado de chats donde está tu usuario
  console.log(await client.getChannels())
  console.log("Canales disponibles:");

});

client.initialize();

module.exports = client;
