# Base Node.js image
FROM node:20

# Instala dependencias necesarias
RUN apt-get update && apt-get install -y wget

# Descarga el Cloud SQL Auth Proxy
RUN wget https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.8.0/cloud-sql-proxy.linux.amd64 -O cloud-sql-proxy \
    && chmod +x cloud-sql-proxy

WORKDIR /app

# Copia dependencias
COPY package.json yarn.lock ./
RUN yarn install

# Copia el resto del código
COPY . .

# Expone el puerto de tu app
EXPOSE 3000

# Variables de entorno necesarias para el proxy
# Estas deben estar definidas en Render:
# - INSTANCE_CONNECTION_NAME (ej. proyecto:región:instancia)
# - DB_USER
# - DB_PASS
# - DB_NAME

# Comando final: inicia el proxy y luego la app
CMD ./cloud-sql-proxy $INSTANCE_CONNECTION_NAME --port=3306 & \
    sleep 5 && \
    yarn build && yarn start
