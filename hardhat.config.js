require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337,                   // Force chainId to 1337
      initialBaseFeePerGas: 0,
      mining: {
        auto: true,
        interval: 0,
        memPool: { order: "fifo" }
      }
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
      initialBaseFeePerGas: 0
    }
  }
};