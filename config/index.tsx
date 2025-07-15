import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { mainnet, arbitrum, polygon, bsc, optimism, base, solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks'

// Get projectId from Reown Cloud
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// EVM networks
export const networks = [mainnet, arbitrum, polygon, bsc, optimism, base]

// Solana networks
export const solanaNetworks = [solana, solanaTestnet, solanaDevnet]

// All networks combined
export const allNetworks = [...networks, ...solanaNetworks]

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: false,
  networks: networks as any,
  projectId,
});

// Set up the Solana Adapter
export const solanaWeb3JsAdapter = new SolanaAdapter()

export const config = wagmiAdapter.wagmiConfig; 