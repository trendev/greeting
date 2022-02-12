export const customNetworks = [
    {
        chainId: '0xA86A',
        chainName: 'Avalanche Mainnet C-Chain',
        nativeCurrency: {
            name: 'Avalanche',
            symbol: 'AVAX',
            decimals: 18
        },
        rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
        blockExplorerUrls: ['https://snowtrace.io/']
    },
    {
        chainId: '0xA869',
        chainName: 'Avalanche Testnet C-Chain',
        nativeCurrency: {
            name: 'Avalanche',
            symbol: 'AVAX',
            decimals: 18
        },
        rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
        blockExplorerUrls: ['https://testnet.snowtrace.io/']
    },
    {
        chainId: '0x61',
        chainName: 'Binance Smart Chain – Testnet',
        nativeCurrency: {
            name: 'Binance',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
        blockExplorerUrls: ['https://testnet.bscscan.com']
    }
];