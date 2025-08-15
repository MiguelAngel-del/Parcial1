# Usamos imagen oficial de Node.jscomo base
FROM node:20

WORKDIR /app

# Se verifican que dependencias se usan
COPY package.json yarn.lock ./

# Instalamos las dependencias
RUN yarn install

# Copia el resto del código
COPY . .

# Expone el puerto a usar en este caso (3000) para backend
EXPOSE 3001

# Compilamos el proyecto
RUN yarn build

# Corremos el proyecto
CMD ["yarn", "start"]
