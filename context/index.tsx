'use client'

import { wagmiAdapter, projectId, solanaWeb3JsAdapter, allNetworks } from '../config'
import { createAppKit } from '@reown/appkit/react' 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

const metadata = {
  name: "ToolAI Presale",
  description: "TAI+ Token Presale Platform",
  url: "https://toolai.ai",
  icons: ["https://toolai.ai/favicon.ico"]
}



const modal = createAppKit({
  adapters: [wagmiAdapter, solanaWeb3JsAdapter].filter(Boolean),
  projectId,
  networks: allNetworks as any,
  defaultNetwork: allNetworks[0] as any,
  metadata: metadata,
  features: {
    analytics: true,
    email: false,
    socials: [],
    emailShowWallets: false
  },
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
    'app.phantom', // Phantom
    '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369', // Rainbow
  ],
  themeMode: 'dark'
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider 