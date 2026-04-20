# frontend/Dockerfile

# Usamos la misma imagen base por consistencia
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiamos dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el código fuente
COPY . .

# Exponemos el puerto por defecto de Vite
EXPOSE 5173

# Iniciamos Vite exponiendo la red al host
CMD ["npm", "run", "dev", "--", "--host"]