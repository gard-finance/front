'use client';

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { PropsWithChildren } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';

const config = createConfig({
  autoConnect: true,
  publicClient: configureChains(
    [goerli],
    [w3mProvider({ projectId: '0357011c2572b34893368b170408a04f' })]
  ).publicClient,
  connectors: w3mConnectors({
    projectId: '0357011c2572b34893368b170408a04f',
    chains: [goerli],
  }),
});

const ethereumClient = new EthereumClient(config, [goerli]);

export const Config = ({ children }: PropsWithChildren) => {
  return (
    <>
      <WagmiConfig config={config}>{children}</WagmiConfig>
      <Web3Modal
        projectId='0357011c2572b34893368b170408a04f'
        ethereumClient={ethereumClient}
      />
    </>
  );
};
