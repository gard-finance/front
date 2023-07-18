import Image from 'next/image';

interface IPoolData {
  l2_address: `0x${string}`;
  l1_address: `0x${string}`;
  l2_underlying: `0x${string}`;
  l2_lp: `0x${string}`;
  bridge_url: string;
  name: string;
  symbol: string;
  logo: string;
}

export const Pool = ({ pool }: { pool: IPoolData }) => {
  const apy = 0;

  return (
    <div className='flex items-center justify-around px-6 py-6'>
      <Image src={pool.logo} alt={pool.name} height={96} />
      <div className='flex flex-col gap-3'>
        <div className='flex items-center w-full justify-between'>
          <h3 className='font-bold text-3xl'>
            {pool.name} ({pool.symbol})
          </h3>
          <h4 className='font-medium text-2xl'>
            {Intl.NumberFormat('en-US').format(apy)}% APY
          </h4>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Pool;
