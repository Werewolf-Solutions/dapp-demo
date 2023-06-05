import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const { PRIVATE_KEY, SEPOLIA_RPC, ALCHEMY_API_KEY } = process.env;

const config: HardhatUserConfig = {
  defaultNetwork: "localhost",
  networks: {
    // hardhat: {
    //   chainId: 31337,
    //   allowUnlimitedContractSize: true,
    // },
    localhost: {
      url: "http://127.0.0.1:7545",
      gas: "auto",
      gasPrice: "auto",
      chainId: 1337,
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/0pxq7rpCrpLKEhOJTDhxS-UhLQwmvcMa", // `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [
        "17997478f24c35bc9c0bcb955df116cb0c2c33d967785f65376ee3704e533526",
      ],
      chainId: 11155111,
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: COINMARKETCAP_API_KEY,
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
};

export default config;
