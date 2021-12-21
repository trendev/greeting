/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const HDWalletProvider = require('@truffle/hdwallet-provider');
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();
const mnemonic = process.env["MNEMONIC"];

const etherscan_api_key = process.env["ETHERSCAN_API"];
const snowtrace_api_key = process.env["SNOWTRACE_API"];

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */
  contracts_build_directory: "../frontend/src/contracts",
  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    // development: {
    //   host: "127.0.0.1",     // Localhost (default: none)
    //   port: 8545,            // Standard Ethereum port (default: none)
    //   network_id: "*",       // Any network (default: none)
    // },
    rinkeby: {
      provider: () => {
        const project_id = process.env["INFURA_PROJECT_ID"]

        return new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${project_id}`);
      },
      network_id: 4
    },

    goerli: {
      provider: () => {
        const project_id = process.env["INFURA_PROJECT_ID"]

        return new HDWalletProvider(
          mnemonic,
          `https://goerli.infura.io/v3/${project_id}`);
      },
      network_id: 5
    },

    ropsten: {
      provider: () => {
        const project_id = process.env["ALCHEMY_PROJECT_ID"]

        return new HDWalletProvider(
          mnemonic,
          `https://eth-ropsten.alchemyapi.io/v2/${project_id}`);
      },
      network_id: 3
    },

    // avalanche testnet
    fuji: {
      provider: () => {
        return new HDWalletProvider(
          mnemonic,
          `https://api.avax-test.network/ext/bc/C/rpc`);
      },
      network_id: 1,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.10",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: etherscan_api_key,
    snowtrace: snowtrace_api_key
  }

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows: 
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  // enabled: false,
  // host: "127.0.0.1",
  // adapter: {
  //   name: "sqlite",
  //   settings: {
  //     directory: ".db"
  //   }
  // }
  // }
};
