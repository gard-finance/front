import { useEffect } from 'react';

import { IPoolData } from '@/components/data';

import { useBeefyAPYs } from '@/stores/beefy';

export const useAPY = (pool: IPoolData) => {
  const { query, data } = useBeefyAPYs();

  useEffect(() => {
    query();
  }, []);

  return data[pool.beefy_id] * 100;
};
