'use client';

import { Listbox } from '@headlessui/react';
import { Web3Button } from '@web3modal/react';
import Head from 'next/head';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { InvokeTransactionReceiptResponse, Status, uint256 } from 'starknet';
import { formatEther, parseAbi, parseEther, toHex } from 'viem';
import { erc20ABI, usePublicClient, useWalletClient } from 'wagmi';

import { Message, useMessages } from '@/stores/messaging';
import { useAccount } from '@/stores/wallet';

import Ethereum from '@/../public/images/ethereum.svg';
import Starknet from '@/../public/images/starknet.svg';
import BridgeABI from '@/constant/abis/bridge';
import { pools } from '@/constant/pools';

export default function ComponentPage() {
  const { token } = useParams();
  const [value, setValue] = useState('0.0');
  const [fromNetwork, setFromNetwork] = useState('starknet');
  const [toNetwork, setToNetwork] = useState('ethereum');
  const pool = pools.find((p) => p.symbol === token);
  const { account, starknet } = useAccount();
  const client = usePublicClient();
  const { data: wallet } = useWalletClient();
  const [claimable, setClaimable] = useState<Message>();
  const {
    push: pushMessage,
    update: updateMessages,
    messages,
    consume: consumeMessage,
  } = useMessages();

  const applyMax = async () => {
    if (account && pool) {
      if (fromNetwork === 'starknet') {
        const { result: max } = await account.callContract({
          contractAddress: pool.l2_underlying,
          entrypoint: 'balanceOf',
          calldata: [account?.address],
        });
        setValue(
          formatEther(uint256.uint256ToBN({ low: max[0], high: max[1] }))
        );
      } else if (wallet) {
        const max = await client.readContract({
          address: pool.l1_underlying,
          abi: erc20ABI,
          functionName: 'balanceOf',
          args: [wallet.account.address],
        });
        setValue(formatEther(max));
      }
    }
  };

  const bridge = async () => {
    if (!account || !wallet) return;
    if (fromNetwork === 'starknet' && toNetwork === 'ethereum') {
      const tx = await account.execute({
        contractAddress: pool!.l2_underlying,
        entrypoint: 'bridge_to_l1',
        calldata: [
          wallet.account.address,
          uint256.bnToUint256(parseEther(value)).low,
          uint256.bnToUint256(parseEther(value)).high,
        ],
      });
      const receipt = (await account.waitForTransaction(
        tx.transaction_hash
      )) as InvokeTransactionReceiptResponse;
      if (receipt.messages_sent && receipt.messages_sent[0]) {
        pushMessage({
          tx: tx.transaction_hash as `0x${string}`,
          status: receipt.status as Status,
          timestamp: Math.floor(Date.now() / 1000),
          message: receipt.messages_sent[0],
        });
      }
    } else if (fromNetwork === 'ethereum' && toNetwork === 'starknet') {
      console.log([
        pool!.l1_bridge_address.toLowerCase(),
        account.address,
        toHex(uint256.bnToUint256(parseEther(value)).low),
        toHex(uint256.bnToUint256(parseEther(value)).high),
      ]);
      // const estimate = await provider.estimateMessageFee({
      //   to_address: pool!.l2_underlying,
      //   from_address: pool!.l1_bridge_address,
      //   entry_point_selector: 'mint',
      //   payload: [
      //     pool!.l1_bridge_address.toLowerCase(),
      //     account.address,
      //     toHex(uint256.bnToUint256(parseEther(value)).low),
      //     toHex(uint256.bnToUint256(parseEther(value)).high),
      //   ],
      // });
      // if ('overall_fee' in estimate) {;

      const tx = await wallet.writeContract({
        address: pool!.l1_underlying,
        abi: erc20ABI,
        functionName: 'approve',
        args: [pool!.l1_bridge_address, parseEther(value)],
      });

      await client.waitForTransactionReceipt({ hash: tx });

      await wallet.writeContract({
        address: pool!.l1_bridge_address,
        abi: parseAbi([
          'function bridgeToL2(uint256 amount,uint256 recipient) external payable',
        ]),
        functionName: 'bridgeToL2',
        args: [parseEther(value), BigInt(account.address)],
        value: parseEther('0.0001'),
      });
      // }
    }
  };

  const claim = async () => {
    if (!wallet || !claimable) return;
    const tx = await wallet.writeContract({
      address: pool!.l1_bridge_address,
      abi: BridgeABI,
      functionName: 'bridgeFromL2',
      args: [claimable.message.payload.map((e) => BigInt(e))],
    });
    await client.waitForTransactionReceipt({ hash: tx });
    setClaimable(undefined);
    consumeMessage(claimable.tx);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const messages = await updateMessages();
      const msg = messages.find(
        (msg) =>
          msg.status === 'ACCEPTED_ON_L1' &&
          msg.message.to_address === pool!.l1_bridge_address
      );
      if (msg) {
        setClaimable(msg);
      }
    }, 60 * 1000 * 2);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main>
      <Head>
        <title>Bridge</title>
      </Head>
      <section className='w-full h-full grid place-content-center'>
        <div className='flex flex-col items-center justify-center px-6 py-14 gap-5 w-max'>
          <h3 className='text-3xl'>Bridge</h3>

          {wallet ? (
            <>
              <div className='flex flex-col gap-1 w-full'>
                <h3 className='text-m'>From</h3>
                <Listbox
                  value={fromNetwork}
                  onChange={(v) => setFromNetwork(v)}
                >
                  <div className='flex flex-col w-full'>
                    <Listbox.Button className='flex w-full bg-white text-black font-medium items-center py-1 px-3 justify-between'>
                      <Image
                        src={fromNetwork === 'ethereum' ? Ethereum : Starknet}
                        alt={fromNetwork}
                        height={30}
                      />
                      <p>
                        {fromNetwork[0].toUpperCase()}
                        {fromNetwork.slice(1)}
                      </p>
                    </Listbox.Button>
                    <Listbox.Options>
                      {['starknet', 'ethereum']
                        .filter((e) => e != fromNetwork)
                        .map((e) => {
                          return (
                            <Listbox.Option
                              key={e}
                              value={e}
                              className='flex w-full bg-white text-black font-medium items-center py-1 px-3 justify-between'
                            >
                              <Image
                                src={e === 'ethereum' ? Ethereum : Starknet}
                                alt={e}
                                height={30}
                              />
                              <p>
                                {e[0].toUpperCase()}
                                {e.slice(1)}
                              </p>
                            </Listbox.Option>
                          );
                        })}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>

              <div className='flex flex-col w-full gap-1'>
                <h3 className='text-m'>Amount ({token})</h3>
                <div className='flex w-full justify-between gap-1'>
                  <input
                    type='text'
                    value={value}
                    placeholder={'0 ' + token}
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
              <div className='flex flex-col gap-1 w-full'>
                <h3 className='text-m'>To</h3>
                <Listbox value={toNetwork} onChange={(v) => setToNetwork(v)}>
                  <div className='flex flex-col w-full'>
                    <Listbox.Button className='flex w-full bg-white text-black font-medium items-center py-1 px-3 justify-between'>
                      <Image
                        src={toNetwork === 'ethereum' ? Ethereum : Starknet}
                        alt={toNetwork}
                        height={30}
                      />
                      <p>
                        {toNetwork[0].toUpperCase()}
                        {toNetwork.slice(1)}
                      </p>
                    </Listbox.Button>
                    <Listbox.Options>
                      {['starknet', 'ethereum']
                        .filter((e) => e != toNetwork)
                        .map((e) => {
                          return (
                            <Listbox.Option
                              key={e}
                              value={e}
                              className='flex w-full bg-white text-black font-medium items-center py-1 px-3 justify-between'
                            >
                              <Image
                                src={e === 'ethereum' ? Ethereum : Starknet}
                                alt={e}
                                height={30}
                              />
                              <p>
                                {e[0].toUpperCase()}
                                {e.slice(1)}
                              </p>
                            </Listbox.Option>
                          );
                        })}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
              <div className='flex flex-col gap-3 items-center w-full'>
                <button
                  className='w-full border-2 border-white rounded-md py-1 px-2'
                  onClick={bridge}
                >
                  Bridge
                </button>
                {claimable && (
                  <>
                    <button
                      className='w-full border-2 border-white rounded-md py-1 px-2'
                      onClick={claim}
                    >
                      Claim on L1
                    </button>
                    <p>
                      {formatEther(
                        uint256.uint256ToBN({
                          low: claimable.message.payload[1],
                          high: claimable.message.payload[2],
                        })
                      )}{' '}
                      {token}
                      available to claim
                    </p>
                  </>
                )}
              </div>
            </>
          ) : (
            <Web3Button />
          )}
        </div>
      </section>
    </main>
  );
}
