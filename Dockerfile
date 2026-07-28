FROM node:20-slim

# Descargamos el navegador Chromium oficial de Linux y sus librerías
RUN apt-get update && apt-get install -y chromium \
    && rm -rf /var/lib/apt/lists/*

# Preparamos la carpeta de trabajo
WORKDIR /app

# Instalamos las librerías de tu bot
COPY package*.json ./
RUN npm install

# Copiamos todo tu código
COPY . .

# Comando para encender el bot
CMD ["node", "bot.js"]