import { IPoolData } from "@/components/data";
import { siteConfig } from "@/constant/config";

export const pools: IPoolData[] = [{ name: 'Ethereum', l1_address: '0x', bridge_url: 'default_bridge_url', l2_address: '0x', l2_lp: '0x', l2_underlying: '0x', logo: '/images/ETH.png', symbol: "ETH" },
{ name: 'Curve USD', l1_address: '0x', bridge_url: `${siteConfig.url}/bridge`, l2_address: '0x', l2_lp: '0x', l2_underlying: '0x', logo: '/images/crvUSD.png', symbol: "crvUSD" },
{ name: 'USD Coin', l1_address: '0x', bridge_url: 'default_bridge_url', l2_address: '0x', l2_lp: '0x', l2_underlying: '0x', logo: '/images/USDC.png', symbol: "USDC" }]
