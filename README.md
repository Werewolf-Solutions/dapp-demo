# Dapp Demo

Welcome to dapp demo!

Feel free to use this code as you wish and please don't be shy to collaborate in any way.

Here below there will be some docs, installation and deploy scripts.

Enjoy!

# Chain

```
cd chain
```

## localhost

```
npx hardhat run test/crowdsale.ts --network localhost
npx hardhat run test/nfts.ts --network localhost

npx hardhat run scripts/deploy.ts --network localhost
```

## Sepolia

```
npx hardhat run test/crowdsale.ts --network sepolia
npx hardhat run test/nfts.ts --network sepolia

npx hardhat run scripts/deploy.ts --network sepolia
```

# Webapp

```
cd webapp

npm start

npm run build
```

# How to create the same app step by step

Create folder

`mkdir dapp-demo && cd dapp-demo`

Create hardhat project in chain folder

`mkdir chain && cd chain && npx hardhat`

Create React app

`cd .. && npx create-react-app webapp`
