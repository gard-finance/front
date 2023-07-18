'use client';

import Pool from "@/components/Pool";
import Button from "@/components/buttons/Button";
import ButtonLink from "@/components/links/ButtonLink";
import { useEffect, useState } from "react";
import Dropdown from 'react-dropdown';

export default function ComponentPage() {
  const [value, setValue] = useState(0.0)
  const [amountToClaim, setAmountToClaim] = useState(0)
  const options = [
    { value: 'Starknet', label: <div className="flex flex-row items-center"><img src={'./images/starknet.svg'} height="30px" width="30px" /> Starknet {"To Ethereum"}<img src={'./images/ETH.png'} height="30px" width="30px" /></div> },
    { value: 'Ethereum', label: <div className="flex flex-row items-center"><img src={'./images/ETH.png'} height="30px" width="30px" /> Ethereum {"To Starknet"} <img src={'./images/starknet.svg'} height="30px" width="30px" /></div> },
  ];

  useEffect(() => {
    getAmountToClaim()
  }, [])

  return (
    <main>
      <section>
        <div className='flex flex-col items-center justify-center px-6 py-14 gap-5'>
          <h3 className="text-3xl">Bridge</h3>

          <div className='flex flex-row  gap-3 items-center'>
            <h3 className="text-m">From</h3>
            <Dropdown options={options} value={options[0].value} onChange={onSelect} />
          </div>

          <div className='flex flex-row w-full items-center gap-3 justify-center'>
            <h3 className="text-m">Amount</h3>
            <input
              type="text"
              value={value}
              placeholder={"0 crvUSD"}
              onChange={e => { setValue(parseFloat(e.currentTarget.value)); }}
            />
            <Button onClick={applyMax}>Max</Button>
          </div>
          <div className='flex flex-col gap-3 items-center'>
            <Button onClick={bridge} className="w-full" variant="light" >Bridge</Button>
            <Button onClick={claim} className="w-full" variant="light">Claim on L1</Button>
            {amountToClaim ? <p>{amountToClaim} available to claim</p> : null}
          </div>
        </div>
      </section>
    </main>
  );

  function applyMax() {
    setValue(0)
  }
  function getAmountToClaim() {
    //get data
    setAmountToClaim(0)
  }

  function onSelect() {
    //change network
  }

  function bridge() {

  }
  function claim() {

  }
}

