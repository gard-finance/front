import { create } from 'zustand';

export interface IBeefyAPYs {
  data: {
    [k: string]: number;
  };
  queried: boolean;
  query: () => Promise<{
    [k: string]: number;
  }>;
}

export const useBeefyAPYs = create<IBeefyAPYs>()((set, get) => {
  return {
    queried: false,
    data: {},
    query: async () => {
      if (get().queried) return get().data;
      else {
        set({
          ...get(),
          queried: true,
          data: await (await fetch('https://api.beefy.finance/apy')).json(),
        });
        return get().data;
      }
    },
  };
});
