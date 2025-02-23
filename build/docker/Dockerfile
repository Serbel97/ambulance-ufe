### compilation stage
FROM node:latest AS build

RUN mkdir /build
WORKDIR /build

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

### we will use polyfea/spa_base as the base image for our
### "BackEnd for (micro)FrontEnd" pattern
FROM ghcr.io/polyfea/spa-base

COPY --from=build /build/www /spa/public

ENV OTEL_SERVICE_NAME=milung-ambulance-ufe
ENV SPA_BASE_PORT=8080
EXPOSE 8080
