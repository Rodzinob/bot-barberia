const { Client, LocalAuth } = require('whatsapp-web.js');
const http = require('http');

// 1. El escudo anti-apagones de Railway
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Bot activo');
}).listen(port, () => console.log(`[SERVER] Puerto ${port} abierto para Railway`));

const client = new Client({
    authStrategy: new LocalAuth({ clientId: 'bot-definitivo' }),
    // Disfrazamos la conexión para engañar a WhatsApp
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    puppeteer: {
        executablePath: '/usr/bin/chromium',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-blink-features=AutomationControlled' // Apaga la alerta de bot
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

// 5. Filtro sin bloqueos
client.on('message_create', async (message) => {
    // Solo ignoramos las historias para que no ensucien tu pantalla
    if (message.from === 'status@broadcast') return;

    // Imprimimos la radiografía exacta del mensaje
    console.log(`[RAW DETECTADO] De: ${message.from} | Texto: ${message.body} | fromMe: ${message.fromMe}`);

    // Si tiene texto y dice hola, dispara
    if (message.body && message.body.toLowerCase().includes('hola')) {
        await message.reply('¡Qué onda! Soy el bot de la barbería funcionando al 100.');
        console.log('[RESPUESTA DISPARADA]');
    }
});

// 6. Encendido con detector de errores
client.initialize().catch(err => {
    console.error('[ERROR CRITICO AL INICIAR]', err);
});
