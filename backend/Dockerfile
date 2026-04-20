# backend/Dockerfile

# Usamos una imagen ligera de Node.js versión 20
FROM node:20-alpine

# Prisma requiere OpenSSL en Alpine Linux
RUN apk add --no-cache openssl

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos solo los archivos de dependencias primero (Para aprovechar la caché de Docker)
COPY package*.json ./
COPY prisma ./prisma/

# Instalamos las dependencias
RUN npm install

# Generamos el cliente de Prisma (CRÍTICO para que NestJS reconozca la BD)
RUN npx prisma generate

# Copiamos el resto del código fuente
COPY . .

# Exponemos el puerto de NestJS
EXPOSE 3000

# Comando para iniciar en modo desarrollo con Hot-Reload
CMD ["npm", "run", "start:dev"]