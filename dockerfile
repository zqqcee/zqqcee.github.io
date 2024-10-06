FROM node:lts AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run astro build

FROM caddy:2
COPY --from=build /app/dist /var/www/html
EXPOSE 80