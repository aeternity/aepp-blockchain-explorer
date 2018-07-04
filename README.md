---
layout: page
title: Blockchain Explorer
navigation: 2
---

# æternity Blockchain Explorer

## Overview
This is an explorer for the æternity blockchain. [Here](https://github.com/aeternity/aepp-blockchain-explorer) is the github repository.

The underlying API is currently being developed and improved. The Explorer is designed to work with the latest features of [Epoch](https://github.com/aeternity/epoch).

## Features
- view a block and its transactions
- view the list of blocks from the latest all the way back to the genesis block
- view list of transactions for each block
- view an account and see its balance
- search for accounts by public key
- search for blocks by their hash and by their position in the blockchain
- view æternity token market exchange rates via coinmarketcap.com api

## Requirements
You need a running Epoch node, later than version 0.15.0

You must expose the external API with a proxy server and set appropriate [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) headers.

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

The epoch api url can be configured with the environment variable `AETERNITY_EPOCH_API_URL`.

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
AETERNITY_EPOCH_API_URL='//sdk-testnet.aepps.com/' npm run dev

# build for production with minification
AETERNITY_EPOCH_API_URL='//sdk-testnet.aepps.com/' npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
