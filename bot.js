const { Client, LocalAuth } = require('whatsapp-web.js');
const http = require('http');

// 1. El escudo anti-apagones de Railway
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Bot activo');
}).listen(port, () => console.log(`[SERVER] Puerto ${port} abierto para Railway`));

// 2. Configuración del Bot
console.log('[BOT] Arrancando motores, por favor espera...');
const client = new Client({
    authStrategy: new LocalAuth({ clientId: 'bot-definitivo' }),
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

// 3. El link del QR mágico
client.on('qr', (qr) => {
    console.log('----------------------------------------------------');
    console.log('[QR] ¡NUEVO CÓDIGO LISTO!');
    console.log('[QR] DA CLIC EN ESTE LINK PARA ESCANEARLO:');
    console.log(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qr)}`);
    console.log('----------------------------------------------------');
});

// 4. Confirmación de éxito
client.on('ready', () => {
    console.log('[BOT] ¡A HUEVO! El bot está conectado, blindado y escuchando.');
});

// 5. Filtro inteligente de mensajes
client.on('message_create', async (message) => {
    // Ignorar bots, grupos y mensajes propios
    if (message.fromMe || !message.body || message.from.endsWith('@lid') || message.from.endsWith('@g.us')) return;

    console.log(`[MENSAJE] Cliente real escribió: ${message.body}`);

    if (message.body.toLowerCase().includes('hola')) {
        await message.reply('¡Qué onda! Soy el bot de la barbería funcionando al 100.');
    }
});

// 6. Encendido con detector de errores
client.initialize().catch(err => {
    console.error('[ERROR CRITICO AL INICIAR]', err);
});
