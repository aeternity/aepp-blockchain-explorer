FROM nginx:mainline-alpine

COPY dist /usr/share/nginx/html
COPY LICENSE.md /usr/share/nginx/html
