FROM nginx:1.25-alpine AS baseserver
COPY nginx.conf /etc/nginx/nginx.conf

FROM node:18.18.2-alpine3.18 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG buildtype=build:staging
RUN npm run $buildtype

FROM baseserver as server
COPY --from=build /usr/src/app/dist/sdvv-frontend /usr/share/nginx/html
