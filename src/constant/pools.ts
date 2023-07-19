import { IPoolData } from '@/components/data';

import { siteConfig } from '@/constant/config';

export const pools: IPoolData[] = [
  // {
  //   name: 'Ethereum',
  //   l1_address: '0x',
  //   bridge_url: 'default_bridge_url',
  //   l2_address: '0x',
  //   l2_lp: '0x',
  //   l2_underlying:
  //     '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
  //   logo: '/images/ETH.png',
  //   symbol: 'ETH',
  // },
  {
    name: 'Curve USD',
    l1_bridge_address: '0x55135781b90dB743dF1524cd3b81F1d2AA92Af70',
    bridge_url: `${siteConfig.url}/bridge`,
    l2_address:
      '0x041f150dc37fdf2ebd67f5200a1466d4424d192ae539bd4c791fe446457d8793',
    l2_lp: '0x0379606e781b0cbf6e6d4d23c320107bcc5da2d6f81ad69bc57594663603e579',
    l2_underlying:
      '0x00c340bc85fca8a367a1ac4cf0a18532273786b8efe996802cd1b77f748db727',
    logo: '/images/crvUSD.png',
    symbol: 'crvUSD',
    l1_vault: '0x03C7Db3EB49d67292e890b5D29D5564baCfD41d7',
    l1_pool: '0x153D063134D9443aCB9e3f3428087dF4F62F3821',
    l1_controller: '0xB651ce73dEF99e70aed40Fa87233eCD41F7B4703',
    l1_underlying: '0x65f1Ed467841212B81fb82238bcD7ad71b501B89',
    beefy_id: 'conic-crvusd',
  },
  // {
  //   name: 'USD Coin',
  //   l1_address: '0x',
  //   bridge_url: 'default_bridge_url',
  //   l2_address: '0x',
  //   l2_lp: '0x',
  //   l2_underlying: '0x',
  //   logo: '/images/USDC.png',
  //   symbol: 'USDC',
  // },
];
