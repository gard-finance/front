'use client';

import Head from 'next/head';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { uint256 } from 'starknet';
import { parseEther } from 'viem';
import { useWalletClient } from 'wagmi';

import { useAccount } from '@/stores/wallet';

import ControllerABI from '@/constant/abis/controller';
import { pools } from '@/constant/pools';

export default function ComponentPage() {
  const { token } = useParams();
  const pool = pools.find((p) => p.symbol === token);
  const { account } = useAccount();
  const { data: wallet } = useWalletClient();
  const [amount, setAmount] = useState('');
  const [operation, setOperation] = useState(0);

  const launch = async () => {
    if (!account) return;
    await account.execute({
      contractAddress: pool!.l2_address,
      entrypoint: 'launch_wave',
    });
  };

  const returnWave = async () => {
    if (!wallet) return;
    await wallet.writeContract({
      address: pool!.l1_controller,
      abi: ControllerABI,
      functionName: 'consumeL2Message',
      args: [
        [
          BigInt(operation),
          BigInt(uint256.bnToUint256(parseEther(amount)).low),
          BigInt(uint256.bnToUint256(parseEther(amount)).high),
        ],
        parseEther('0.0001'),
        parseEther('0.0001'),
        BigInt(0),
      ],
      value: parseEther('0.0002'),
    });
  };

  return (
    <main>
      <Head>
        <title>Admin</title>
      </Head>
      <section className='w-full h-full grid place-content-center'>
        <div className='flex flex-col items-center justify-center px-6 py-14 gap-5 w-max'>
          <button onClick={launch}>Launch wave</button>
          <button onClick={returnWave}>Return wave</button>
          <input
            placeholder='operation'
            type='text'
            value={operation}
            onChange={(e) => setOperation(Number(e.currentTarget.value))}
            className='text-black'
          />
          <input
            placeholder='amount'
            type='text'
            value={amount}
            onChange={(e) => setAmount(e.currentTarget.value)}
            className='text-black'
          />
        </div>
      </section>
    </main>
  );
}
