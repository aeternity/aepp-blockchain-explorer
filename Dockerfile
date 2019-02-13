FROM node:10.15.1-alpine as explorer-build
WORKDIR /app
COPY . .
RUN apk add --no-cache --virtual .build-deps make gcc g++ python git && \
    npm install --only=prod && npm run build && \
    npm cache clean --force && \
    apk del .build-deps

FROM node:10.15.1-alpine as explorer

WORKDIR /app
COPY --from=explorer-build /app/.nuxt /app/.nuxt
RUN npm install nuxt@2.4.3 @nuxtjs/axios@5.0.0 && npm cache clean --force
COPY package.json package.json
COPY LICENSE.md LICENSE.md
ENV HOST 0.0.0.0
EXPOSE 3000
CMD [ "npm", "start" ]