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
You need a running Epoch node, version 0.24.0

## Build Setup

The epoch api url can be configured with the environment variable `VUE_APP_EPOCH_URL`.

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
VUE_APP_EPOCH_URL='//sdk-testnet.aepps.com/' npm run serve

# build for production with minification
VUE_APP_EPOCH_URL='//sdk-testnet.aepps.com/' npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
