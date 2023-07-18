import {
  connect,
  disconnect,
  StarknetWindowObject,
} from '@argent/get-starknet';
import { AccountInterface } from 'starknet';
import { create } from 'zustand';

export interface AccountStore {
  account: AccountInterface | null;
  connect: () => void;
  disconnect: () => void;
  starknet: StarknetWindowObject | null;
}

export const useAccount = create<AccountStore>()((set) => ({
  account: null,
  starknet: null,
  connect: async () => {
    const data = await connect({
      modalTheme: 'dark',
      modalMode: 'alwaysAsk',
      alwaysShowDiscovery: true,
    });
    return set((state) => ({
      ...state,
      account: data?.account,
      starknet: data,
    }));
  },
  disconnect: async () => {
    await disconnect();
    return set((state) => ({
      ...state,
      account: null,
      starknet: null,
    }));
  },
}));
