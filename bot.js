const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/usr/bin/chromium',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});
// Cuando necesite loguearse, escupirá un LINK mágico
client.on('qr', (qr) => {
    console.log('¡DA CLIC EN ESTE LINK PARA VER EL QR PERFECTO:');
    console.log(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qr)}`);
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
