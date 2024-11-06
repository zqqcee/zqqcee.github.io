FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com
RUN npm install
COPY . .
RUN npm run astro build

FROM caddy:2
COPY ./CaddyFile /etc/caddy/Caddyfile
COPY --from=build /app/dist /var/www/html
EXPOSE 80
EXPOSE 443