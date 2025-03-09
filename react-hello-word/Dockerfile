# Usa una imagen base de Node
FROM node:22

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json (si existe)
COPY package*.json ./
RUN apt-get install -y curl 
# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Instala un servidor HTTP simple para servir el contenido estático
RUN npm install -g serve

# Expon el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Define el comando por defecto que se ejecutará cuando el contenedor inicie
CMD ["serve", "-s", "build", "-l", "3000"]