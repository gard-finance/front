import Image from 'next/image';
import { useEffect, useState } from 'react';
import { uint256 } from 'starknet';
import { formatEther } from 'viem';
import { usePublicClient } from 'wagmi';

import { useAPY } from '@/hooks/beefy';

import { IPoolData } from '@/components/data';
import ButtonLink from '@/components/links/ButtonLink';

import { useAccount } from '@/stores/wallet';

import BeefyVaultV7ABI from '@/constant/abis/beefy';
import GAPoolABI from '@/constant/abis/pool';

export const PoolDisplay = ({ pool }: { pool: IPoolData }) => {
  const [tvl, setTVL] = useState<string>();
  const [balance, setBalance] = useState<string>();
  const [lastWave, setLastWave] = useState<number>();
  const { account } = useAccount();
  const client = usePublicClient();
  const APY = useAPY(pool);

  useEffect(() => {
    async function query() {
      const lpBalance = await client.readContract({
        address: pool.l1_pool,
        abi: BeefyVaultV7ABI,
        functionName: 'balanceOf',
        args: [pool.l1_controller],
      });
      const underlyingBalance = await client.readContract({
        address: pool.l1_pool,
        abi: GAPoolABI,
        functionName: 'convertToAssets',
        args: [lpBalance],
      });
      setTVL(formatEther(underlyingBalance));
      if (account) {
        const { result: lastWave } = await account.callContract({
          contractAddress: pool.l2_address,
          entrypoint: 'last_wave',
          calldata: [],
        });
        setLastWave(Number(lastWave[0]));
        const { result: lp2Balance } = await account.callContract({
          entrypoint: 'balance_of',
          contractAddress: pool.l2_lp,
          calldata: [account.address],
        });
        setBalance(
          formatEther(
            await client.readContract({
              address: pool.l1_pool,
              abi: GAPoolABI,
              functionName: 'convertToAssets',
              args: [
                uint256.uint256ToBN({
                  low: lp2Balance[0],
                  high: lp2Balance[1],
                }),
              ],
            })
          )
        );
      }
    }
    query();
  }, [account]);

  return (
    <div className='flex items-center justify-center px-6 py-10 gap-20 border-2 border-primary-200 rounded-lg w-[940px]'>
      <Image src={pool.logo} width={96} alt={pool.name} height={96} />
      <div className='flex flex-col gap-3'>
        <div className='flex items-center w-full justify-between gap-20'>
          <h3 className='font-bold text-3xl'>
            {pool.name} ({pool.symbol})
          </h3>
          <h4 className='font-medium text-2xl'>
            {Intl.NumberFormat('en-US').format(APY)}% APY
          </h4>
        </div>

        <div className='flex items-center w-full justify-between gap-20'>
          <h3 className='text-xl'>
            TVL: {tvl} <span className='text-lg'>{pool.symbol}</span>
          </h3>
          <h3 className='text-xl'>
            DAILY APY: {Intl.NumberFormat('en-US').format(APY / 365.25)}%
          </h3>
          <h3 className='text-xl'>
            BALANCE: {balance || 0}{' '}
            <span className='text-lg'>{pool.symbol}</span>
          </h3>
        </div>
        <div>
          <div className='flex items-center w-full justify-between '>
            <h3 className='text-xl'>
              Next wave:{' '}
              {Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              }).format((lastWave || 0) + 24 * 3600)}
            </h3>
            <div className='flex gap-3'>
              <ButtonLink href={`/${pool.symbol}/deposit`}>Deposit</ButtonLink>
              <ButtonLink href={`/${pool.symbol}/withdraw`}>
                Withdraw
              </ButtonLink>
              <ButtonLink href={`/${pool.symbol}/bridge`}>Bridge</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolDisplay;
