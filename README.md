---
layout: page
title: Introduction
navigation: 2
---

# Aeternity Blockchain Explorer
This is a early stage MVP of a Chain Explorer for the Aeternity Blockchain.
The underlying API is currently being developed and improved by the day. The Explorer is designed to work with the latest changes (HEAD master) of `aeternity/epoch`.

## Features
- uses API v2
- view a block with transactions
- view list of blocks from latest to genesis
- view list of transactions from latest to genesis
- view an account and see balance
- search for accounts by public key
- search for blocks by hash and height
- aeternity token market stats via coinmarketcap.com api

## Requirements

You need a running node of `aeternity/epoch` with api v2. You should expose the internal API with a proxy server and set CORS related headers.

NGINX Example:
```
# /etc/nginx/sites-available/default
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;
        server_name _;
        location / {
                try_files $uri $uri/ =404;
        }
        location /api/internal/v1/ {
                include cors.conf;
                proxy_bind 127.0.0.1;
                proxy_pass http://localhost:3103/v1/;
        }
        location /api/external/v1/ {
                include cors.conf;
                proxy_bind 127.0.0.1;
                proxy_pass http://localhost:3003/v1/;
        }
}
# /etc/nginx/cors.conf
                if ($request_method = 'OPTIONS') {
                        add_header 'Access-Control-Allow-Origin' '*';
                        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
                        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
                        add_header 'Access-Control-Max-Age' 1728000;
                        add_header 'Content-Type' 'text/plain; charset=utf-8';
                        add_header 'Content-Length' 0;
                        return 204;
                }
                if ($request_method = 'POST') {
                        add_header 'Access-Control-Allow-Origin' '*';
                        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
                        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
                        add_header 'Access-Control-Expose-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
                }
                if ($request_method = 'GET') {
                        add_header 'Access-Control-Allow-Origin' '*';
                        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
                        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
                        add_header 'Access-Control-Expose-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
                }

```

## Build Setup

adjust url to epoch proxy in `src/main.js`
```
Vue.http.options.root = 'http://139.59.140.51/api/'

```

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```
