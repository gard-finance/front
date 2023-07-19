import Image from 'next/image';

import { useAPY } from '@/hooks/beefy';

import { IPoolData } from './data';

export const Pool = ({ pool }: { pool: IPoolData }) => {
  const apy = useAPY(pool);

  return (
    <div className='flex items-center gap-6'>
      <Image src={pool.logo} width={48} alt={pool.name} height={48} />
      <h3 className='font-medium'>{pool.symbol}</h3>
      <h4 className='font-medium'>
        {Intl.NumberFormat('en-US').format(apy)}% APY
      </h4>
    </div>
  );
};

export default Pool;
