
import Image from 'next/image';
import { IPoolData } from './data';



export const Pool = ({ pool }: { pool: IPoolData }) => {
  const apy = 0;

  //get data from L2

  return (
    <div className='flex items-center justify-around px-6 py-6'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center w-full justify-between'>
          <Image src={pool.logo} width={48} alt={pool.name} height={48} />
          <h3 className='font-bold text-l'>
            {pool.name} ({pool.symbol})
          </h3>
          <h4 className='font-medium text-l'>
            {Intl.NumberFormat('en-US').format(apy)}% APY
          </h4>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default Pool;
