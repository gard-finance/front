'use client';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { uint256 } from 'starknet';
import { formatEther, parseEther } from 'viem';

import Pool from '@/components/Pool';

import { useAccount } from '@/stores/wallet';

import { ETH } from '@/constant/config';
import { pools } from '@/constant/pools';
import ExternalIcon from '@/icons/external.svg';

export default function ComponentPage({
  params,
}: {
  params: { token: string };
}) {
  const pool = pools.find(
    (el) => el.symbol.toLowerCase() == params.token.toLowerCase()
  );
  const [value, setValue] = useState('0.0');
  const { account } = useAccount();
  const [hasPendingLp, setHasPendingLP] = useState(false);

  useEffect(() => {
    async function query() {
      if (account) {
        const { result: lps } = await account.callContract({
          contractAddress: pool!.l2_address,
          entrypoint: 'pending_withdraw',
          calldata: [account.address],
        });
        const amount = uint256.uint256ToBN({ low: lps[0], high: lps[1] });
        if (amount != BigInt(0)) {
          const { result: last_wave_id } = await account.callContract({
            contractAddress: pool!.l2_address,
            entrypoint: 'current_wave_id',
          });
          if (BigInt(last_wave_id[0]) > BigInt(lps[2])) setHasPendingLP(true);
        }
      }
    }

    query();
  }, [account]);

  if (!pool) {
    throw new Error('wrong pool');
  }

  const withdraw = async () => {
    if (!account) return;
    const amount = uint256.bnToUint256(
      parseEther(parseFloat(value).toString())
    );
    await account.execute([
      {
        contractAddress: pool!.l2_address,
        entrypoint: 'withdraw',
        calldata: [amount.low, amount.high],
      },
    ]);
  };

  const claim = async () => {
    if (!account) return;
    await account.execute({
      contractAddress: pool!.l2_address,
      entrypoint: 'claim_withdral',
    });
  };

  return (
    <main className='w-full h-full'>
      <Head>
        <title>Withdraw</title>
      </Head>
      <section className='w-full h-full grid place-content-center'>
        <div className='flex flex-col items-center justify-center px-6 py-6 gap-5 border-2 rounded-lg border-primary-200 w-max'>
          <div className='flex flex-row  gap-3 items-center'>
            <h3 className='text-2xl'>Withdraw</h3>
            <Pool pool={pool} />
          </div>
          <div className='flex flex-row w-full items-center gap-3 justify-between'>
            <Link
              href={`https://app.jediswap.xyz/#/swap?inputCurrency=${pool.l2_underlying}&outputCurrency=${ETH}`}
              target='_blank'
              className='flex gap-1'
            >
              Sell {pool.symbol}
              <Image src={ExternalIcon} alt='external' height={13} />
            </Link>
            <Link
              href={`https://app.jediswap.xyz/#/swap?inputCurrency=${pool.l2_lp}&outputCurrency=${ETH}`}
              target='_blank'
              className='flex gap-1'
            >
              Sell GALP-{pool.symbol}{' '}
              <Image src={ExternalIcon} alt='external' height={13} />
            </Link>
          </div>
          <div className='flex flex-col w-full gap-1'>
            <h3 className='text-m'>Amount (GALP-{pool.symbol})</h3>
            <div className='flex w-full justify-between gap-1'>
              <input
                type='text'
                value={value}
                placeholder={'0 ' + pool.symbol}
                onChange={(e) => {
                  setValue(e.currentTarget.value);
                }}
                className='outline-none border-2 border-primary-200 rounded-sm bg-black w-full'
              />
              <button
                onClick={applyMax}
                className='bg-white font-bold text-black py-1 px-2 rounded-sm'
              >
                Max
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-3 items-center w-full '>
            {hasPendingLp ? (
              <button
                className='w-full bg-white font-bold text-black py-1 px-2 rounded-sm'
                onClick={claim}
              >
                Claim
              </button>
            ) : (
              <button
                className='w-full bg-white font-bold text-black py-1 px-2 rounded-sm'
                onClick={withdraw}
              >
                Withdraw
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );

  async function applyMax() {
    if (!account) return;
    const { result: max } = await account.callContract({
      contractAddress: pool!.l2_lp,
      entrypoint: 'balanceOf',
      calldata: [account?.address],
    });
    setValue(formatEther(uint256.uint256ToBN({ low: max[0], high: max[1] })));
  }
}
