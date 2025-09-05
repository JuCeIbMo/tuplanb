FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Da permisos al usuario pptruser sobre la carpeta de trabajo
USER root
RUN mkdir -p /usr/src/app/.wwebjs_auth /usr/src/app/.wwebjs_cache \
  && chown -R pptruser:pptruser /usr/src/app

# Cambia al usuario recomendado por la imagen base
USER pptruser

# Instala solo dependencias de producción (usa --omit=dev en vez de --production)
RUN npm install --omit=dev

# Copia el resto del código fuente
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
