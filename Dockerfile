# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Instala dependencias de sistema para compilación si es necesario
RUN apk add --no-cache bash git && rm -rf /var/cache/apk/*

# Copia package.json y lockfile
COPY package.json package-lock.json* bun.lockb* ./

# Usar npm para instalaciones si bun no está presente
RUN if [ -f "bun.lockb" ]; then echo "bun lock present but bun not installed in image, using npm"; fi

# Instala dependencias
RUN npm ci --prefer-offline --no-audit --progress=false

# Copia el resto del código
COPY . .

# Generar build de producción
RUN npm run build

# Production stage - nginx para servir contenido estático
FROM nginx:stable-alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración nginx personalizada para SPA
COPY nginx.conf /etc/nginx/nginx.conf

# Healthcheck simple: comprobar que el index responde
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
	CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
