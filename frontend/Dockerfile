#######################################
# Stage 1: Build Angular application  #
#######################################
FROM node:12 AS build-satge

WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build -- --prod

################################################
# Stage 1: Serve Angular app from NGINX Srver  #
################################################
FROM nginx:stable-alpine
LABEL version="1.0"

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --from=build-satge /usr/src/app/dist/soptass/ .

EXPOSE 80