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
- View a generation, key blocks, micro blocks and transactions
- View the list of generations from the latest all the way back to the genesis block
- View list of transactions for each generation, micro block
- View an account and see its balance
- Search for accounts by public key
- Search for blocks, generation, transaction by their hash and by their position in the blockchain
- View æternity token market exchange rates via coinmarketcap.com api

## Requirements
- If using default nodes from roma-net, sdk-testnet, no running node is needed
- If using local epoch node you need latest running Epoch node

## Build Setup

The epoch api url can be configured from `.env` file or environment variable `VUE_APP_EPOCH_URL`.

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve
VUE_APP_EPOCH_URL='https://sdk-testnet.aepps.com/' npm run serve
VUE_APP_EPOCH_URL='https://roma-net.aepps.com/' npm run serve

# build for production with minification
VUE_APP_EPOCH_URL='https://sdk-testnet.aepps.com/' npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
