require("babel-register");
require("babel-polyfill");

module.exports = {
  networks: {
    development: {
      host: "10.103.9.149",
      port: 7545,
      network_id: "*" // Match any network id
    },
    advanced: {
      websockets: true // Enable EventEmitter interface for web3 (default: false)
    }
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
