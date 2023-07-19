'use client';

import Head from 'next/head';
import * as React from 'react';

import PoolDisplay from '@/components/PoolDisplay';

import { pools } from '@/constant/pools';

export default function HomePage() {
  const default_bridge_url = 'https://starkgate.starknet.io/';

  return (
    <main className='h-full py-10'>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='flex flex-col items-center justify-between h-full'>
        {pools.map((el, i) => (
          <PoolDisplay pool={el} key={i} />
        ))}
      </section>
    </main>
  );
}
