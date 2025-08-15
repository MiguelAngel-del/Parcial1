# Usamos imagen oficial de Node.js como base
FROM node:20

WORKDIR /app

# Copiamos dependencias
COPY package.json yarn.lock ./
RUN yarn install

# Copiamos el resto del código
COPY . .

# Expone el puerto
EXPOSE 3000

# En lugar de compilar antes, lo hacemos en el CMD
CMD yarn build && yarn start
