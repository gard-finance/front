'use client';
import { siteConfig } from '@/constant/config';

import Pool from '@/components/Pool';
import PoolDisplay from '@/components/PoolDisplay';
import getData, { IPoolData, IResultData, Token } from '@/components/data';
import Head from 'next/head';
import * as React from 'react';
import { pools } from '@/constant/pools';



export default function HomePage() {

  const default_bridge_url = "https://starkgate.starknet.io/"


  const data: IResultData[] = getData(pools)

  const displayPools = data.map(el => <PoolDisplay pool={el} />)

  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section>
        {displayPools}
      </section>
    </main>
  );
}
