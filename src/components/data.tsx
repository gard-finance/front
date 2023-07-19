export interface IPoolData {
  l1_bridge_address: `0x${string}`;
  l1_controller: `0x${string}`;
  l1_pool: `0x${string}`;
  l1_vault: `0x${string}`;
  l2_address: `0x${string}`;
  l2_underlying: `0x${string}`;
  l1_underlying: `0x${string}`;
  l2_lp: `0x${string}`;
  bridge_url: string;
  name: string;
  symbol: string;
  logo: string;
  beefy_id: string;
}

export interface Token {
  address: string;
  name: string;
  symbol: string;
  logo: string;
}

export const beefy_address = '';
export const rpc = '';
