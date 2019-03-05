FROM node:10.15.1-alpine as explorer-build
WORKDIR /app
RUN apk add make gcc g++ python git
COPY package*.json ./
RUN npm install --only=prod
COPY . .
RUN npm run build


FROM node:10.15.1-alpine as explorer
WORKDIR /app
COPY --from=explorer-build /app/.nuxt /app/.nuxt
RUN npm install nuxt@2.4.5 @nuxtjs/axios@5.0.0 @download/blockies@1.0.3 clipboard-copy@2.0.1 && \
    npm cache clean --force
COPY package.json package.json
COPY LICENSE.md LICENSE.md
ENV HOST 0.0.0.0
EXPOSE 80
CMD [ "npm", "start" ]