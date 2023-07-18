
import { siteConfig } from '@/constant/config';
import { Contract, Provider, constants } from 'starknet';
import { ethers } from "ethers";
import { beefy_abi } from '@/constant/abi';


export interface IPoolDisplayData {
  l2_address: `0x${string}`;
  l1_address: `0x${string}`;
  l2_underlying: `0x${string}`;
  l2_lp: `0x${string}`;
  bridge_url: string;
  name: string;
  symbol: string;
  logo: string;
}

export interface IPoolData {
  l2_address: `0x${string}`;
  l1_address: `0x${string}`;
  l2_underlying: `0x${string}`;
  l2_lp: `0x${string}`;
  bridge_url: string;
  name: string;
  symbol: string;
  logo: string;
}

export interface IResultData {
  apy: number;
  balance: number;
  daily_apy: number;
  tvl: number;
  next_wave: number;
  name: string;
  symbol: string;
  logo: string;
}

export interface Token {
  address: string;
  name: string;
  symbol: string;
  logo: string;
}



const getData = (tokens: IPoolData[]): IResultData[] => {
  const beefy_address: string = ""
  const rpc: string = ""

  //const provider_eth = new ethers.providers.JsonRpcProvider(rpc);
  //const beefyContract = new ethers.Contract(beefy_address, beefy_abi, provider_eth);

  let tab: IResultData[] = []
  //const provider_stk = new Provider({ sequencer: { network: constants.NetworkName.SN_GOERLI } });

  tokens.forEach(async el => {

    /* const { abi: testAbi } = await provider_stk.getClassAt(el.l2_address);
    if (testAbi === undefined) { throw new Error("no abi.") };
    const poolContract = new Contract(testAbi, el.l2_address, provider_stk);
    let shares_amout = await beefyContract.balanceOf(el.l1_address)
    let price_share = await beefyContract.getPricePerFullShare()
    let tvl = shares_amout * price_share */

    let obj: IResultData = {
      apy: 0, balance: 0, daily_apy: 0, logo: el.logo, name: el.name, next_wave: 0, symbol: el.symbol, tvl: 0
    }
    tab.push(obj)
  })



  return tab
}

export default getData