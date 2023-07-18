import Button from '@/components/buttons/Button';
import { IResultData } from '@/components/data';
import ButtonLink from '@/components/links/ButtonLink';
import Image from 'next/image';


export const PoolDisplay = ({ pool }: { pool: IResultData }) => {

  return (
    <div className='flex items-center justify-center px-6 py-14 gap-20'>
      <Image src={pool.logo} width={96} alt={pool.name} height={96} />
      <div className='flex flex-col gap-3'>
        <div className='flex items-center w-full justify-between gap-20'>
          <h3 className='font-bold text-3xl'>
            {pool.name} ({pool.symbol})
          </h3>
          <h4 className='font-medium text-2xl'>
            {Intl.NumberFormat('en-US').format(pool.apy)}% APY
          </h4>
        </div>

        <div className='flex items-center w-full justify-between gap-20'>
          <h3 className='text-xl'>
            TVL: {pool.tvl}
          </h3>
          <h3 className='text-xl'>
            DAILY APY: {pool.daily_apy}
          </h3>
          <h3 className='text-xl'>
            BALANCE: {pool.balance}
          </h3>
        </div>
        <div>

          <div className='flex items-center w-full justify-between '>
            <h3 className='text-xl'>
              Next wave: {pool.next_wave}
            </h3>
            <div className='flex gap-3'>
              <ButtonLink href={`/${pool.symbol}/deposit`}>
                Deposit
              </ButtonLink>
              <ButtonLink href={`/${pool.symbol}/withdraw`}>
                Withdraw
              </ButtonLink>
              <ButtonLink href={`/${pool.symbol}/bridge`}>
                Bridge
              </ButtonLink>
            </div>

          </div>


        </div>
      </div>
    </div>
  );
};

export default PoolDisplay;
