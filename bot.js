const http = require('http');
const port = process.env.PORT || 3000;

// Servidor fantasma para mantener vivo a Railway
http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Bot de la barberia activo');
}).listen(port, () => console.log(`Puerto ${port} abierto para Railway`));

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


const client = new Client({
    authStrategy: new LocalAuth({ clientId: 'bot-nube' }), // <-- El truco está aquí
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


client.on('message_create', async (message) => {
    // 1. Ignorar mensajes que tú mismo envíes
    if (message.fromMe) return;

    // 2. Ignorar notificaciones del sistema vacías o de tipo @lid
    if (!message.body || message.from.endsWith('@lid')) return;

    // 3. Ignorar chats grupales (si solo quieres atender chats individuales)
    if (message.from.endsWith('@g.us')) return;

    console.log(`Mensaje de cliente real (${message.from}): ${message.body}`);

    // 4. Lógica de respuesta
    if (message.body.toLowerCase().includes('hola')) {
        await message.reply('¡Qué onda! Soy el bot de la barbería funcionando al 100.');
    }
});

client.initialize();
