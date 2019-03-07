[![Waffle.io - Issues in progress](https://badge.waffle.io/aeternity/aepp-blockchain-explorer.png?label=in%20progress&title=In%20Progress)](http://waffle.io/aeternity/aepp-blockchain-explorer)
# æternity Blockchain Explorer

## Overview
This is an explorer for the æternity blockchain. [Here](https://github.com/aeternity/aepp-blockchain-explorer) is the github repository.

The underlying API is currently being developed and improved. The Explorer is designed to work with the latest features of [æternity](https://github.com/aeternity/aeternity) and [æpp-middleware](https://github.com/aeternity/aepp-middleware).

## Upcoming
We are workin on the next version and the designs are available [here](https://sketch.cloud/s/JaY59). We are looking for input on what data we should show, and would appreciate your voice. Feel free to open a ticket and mark it with the `proposal` label

## Features
- View a generation, key blocks, micro blocks and transactions
- View the list of generations from the latest all the way back to the genesis block
- View list of transactions for each generation, micro block
- View an account and see its balance
- Search for accounts by public key
- Search for blocks, generation, transaction by their hash and by their position in the blockchain
- View æternity token market exchange rates via coinmarketcap.com api


## Build Setup

The node api url can be configured from `.env` file or environment variable `VUE_APP_NODE_URL`.

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve
VUE_APP_NODE_URL='https://roma-net.mdw.aepps.com/' npm run serve

# build for production with minification
VUE_APP_NODE_URL='https://roma-net.mdw.aepps.com/' npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
