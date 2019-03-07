# Aeternity Explorer Roadmap

## Dashboard (Landing Page)
- [ ] showcase data about `aeternity blockchain` such as: 
  - [ ] show `stream graph` of number of tx per time interval
  - [ ] show size of blockchain 
  - [ ] show reward, blocks mined, difficulty, peers
- [x] show list of 5 latest generations (updated through websocket)
- [x] show list of 5 latest transactions (updated through websocket)
- [ ] show active contracts
- [ ] show open statechannels

## Statistics
This will be the parent page for a range of charts, which can evolve over time. The dashboard can be customized with settings store in `localStorage`. Will be useful for poweruser. This functionality could be extended to other areas, to make the explorer somewhat personisable.
-  [ ] Hash-rate Distribution
- [ ] size of blockchain (gb)
- [ ] Wealth Distribution: Top 10/100/1,000/10,000 addresses
- [ ] Median Confirmation Time (https://www.blockchain.com/charts/median-confirmation-time)
- [ ] Graph showing `network difficulty` over time period
- [ ] Mining pool realtime power
- [ ] Total AE mined
- [ ] Reward per block

## Name Services
- [ ] Name to Address Search and Reverse Lookup

## State Channels
- [ ] Show open/active state channel list

## Oracles
- [ ] Show list of active oracles
- [ ] Show all oracles
- [ ] Per Oracle - Request/Response

## Contracts
- [ ] Search contract by address
- [ ] List most active contracts
- [ ] Contract Verification tool
- [ ] Per Contract
    - [ ] Show contract calls with args
    - [ ] Show contract side effects

## Accounts
- [ ] QR code generator along with view/copy button. For use in base aepp.
- [ ] Account Verification/Labeling for popular/unpolular accounts
- [ ] List of top accounts with balance and age(first transaction/last transaction)

## Aeternity Insight
Visual interpretation of the `æternity blockchain` illustrating the relationship between `keyblocks`, `microblocks`, `transactions` and `statechannels`, forking in a relationship. 
Based on live data, this can be useful to present the concept of æternity in a visual way.

## Ecosystem
- [ ] inform of additional official services and tools
- [ ] have a curated list of community built tools and services
