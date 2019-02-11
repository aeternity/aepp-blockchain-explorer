FROM node:10.15.1-alpine as aepp-explorer-build
ARG VUE_APP_EPOCH_URL
WORKDIR /app
RUN apk add make gcc g++ python git
COPY  . .
RUN npm install
RUN VUE_APP_EPOCH_URL=$VUE_APP_EPOCH_URL npm run build

FROM nginx:1.13.7-alpine

COPY --from=aepp-explorer-build /app/dist /usr/share/nginx/html
COPY LICENSE.md /usr/share/nginx/html
