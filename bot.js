const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Iniciamos el cliente de WhatsApp con guardado de sesión local
const client = new Client({
    authStrategy: new LocalAuth() 
});

// Cuando necesite loguearse, escupirá el QR en la terminal
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('¡Abre tu WhatsApp y escanea este código QR!');
});

// Cuando el escaneo sea exitoso
client.on('ready', () => {
    console.log('¡A huevo! El bot está conectado y escuchando.');
});

// Cuando alguien te mande un mensaje
client.on('message', async (message) => {
    console.log(`Mensaje nuevo: ${message.body}`);

    // Responder en automático si te dicen "hola"
    if(message.body.toLowerCase() === 'hola') {
        message.reply('¡Qué onda! Soy el bot de prueba funcionando al 100.');
    }
});

client.initialize();