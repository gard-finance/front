'use client';

import Pool from "@/components/Pool";
import Button from "@/components/buttons/Button";
import { IPoolData } from "@/components/data";
import ButtonLink from "@/components/links/ButtonLink";
import { pools } from "@/constant/pools";
import Head from "next/head";
import { useState } from "react";

export default function ComponentPage({ params }: { params: { token: string } }) {
  const pool = pools.find(el => el.symbol.toLowerCase() == params.token.toLowerCase())
  const [value, setValue] = useState("")
  if (!pool) { throw new Error("wrong pool") }

  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section>
        <div className='flex flex-col items-center justify-center px-6 py-14 gap-5'>
          <div className='flex flex-row  gap-3 items-center'>
            <h3 className="text-3xl">Deposit</h3>
            <Pool pool={pool} />
          </div>
          <div className='flex flex-row w-full items-center gap-3 justify-center'>
            <ButtonLink href="" className="text-3xl" variant="ghost">Buy {pool.symbol}</ButtonLink>
            <ButtonLink href="" className="text-3xl" variant="ghost" >Buy GALP-{pool.symbol}</ButtonLink>
          </div>
          <div className='flex flex-row w-full items-center gap-3 justify-center'>
            <h3 className="text-m">Amount</h3>
            <input
              type="text"
              value={value}
              placeholder={"0 " + pool.symbol}
              onChange={e => { setValue(e.currentTarget.value); }}
            />
            <Button>Max</Button>
          </div>
          <div className='flex flex-col gap-3 items-center'>
            <Button className="w-full" variant="light">Deposit</Button>
            <Button className="w-full" variant="light">Claim</Button>
          </div>

        </div>

      </section>
    </main>
  )
}

