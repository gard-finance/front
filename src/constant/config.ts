import { constants, SequencerProvider } from 'starknet';

export const siteConfig = {
  title: 'Gard Finance Alpha',
  description:
    'Gard Finance is a Starknet DeFi protocol that allows users to interact with L1 DeFi protocols in a gas-efficient manner.',
  /** Without additional '/' on the end, e.g. https://theodorusclarence.com */
  url: 'https://gard.fi',
};

export const ETH =
  '0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7';

export const provider = new SequencerProvider({
  baseUrl: constants.BaseUrl.SN_GOERLI,
});
