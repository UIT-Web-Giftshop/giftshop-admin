FROM node:16-alpine as builder
ARG build_env=dev
RUN echo ${build_env}
ENV NODE_ENV=production
WORKDIR /app
COPY ["package*.json", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN npm run build:${build_env}

FROM nginx:stable-alpine as publish
ENV NODE_ENV production
WORKDIR /usr/share/nginx/html
COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ .
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
