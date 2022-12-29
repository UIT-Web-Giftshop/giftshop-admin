FROM node:16-alpine as build-stage
ENV NODE_ENV=production
WORKDIR /app
COPY ["package*.json", "yarn*.lock", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN npm run build --prod

FROM nginx:stable-alpine as publish-stage
RUN apk add --no-cache bash
WORKDIR /usr/share/nginx/html
# override nginx conf
COPY ./docker/conf /etc/nginx/conf.d
# static build
COPY --from=build-stage /app/build .
# use port 3000
EXPOSE 3000
COPY ["./.env*", "./env.sh", "./"]
RUN chmod +x ./env.sh
CMD [ "/bin/bash", "-c", "./env.sh && nginx -g \"daemon off;\"" ]
