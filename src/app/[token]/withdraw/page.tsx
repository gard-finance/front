import Pool from "@/components/Pool";
import Button from "@/components/buttons/Button";
import ButtonLink from "@/components/links/ButtonLink";
import { pools } from "@/constant/pools";
import { useEffect, useState } from "react";

export default function ComponentPage({ params }: { params: { token: string } }) {
  const pool = pools.find(el => el.symbol.toLowerCase() == params.token.toLowerCase())
  const [value, setValue] = useState(0.0)
  const [withdrawHidden, setWithdrawHidden] = useState(false)
  const [claimHidden, setClaimHidden] = useState(true)
  const [availableFunds, setAvailableFunds] = useState(0)
  const [availableFundsTime, setAvailableFundsTime] = useState(0)

  useEffect(() => {
    isAvailable()
  }, [])

  if (!pool) { throw new Error("wrong pool") }

  return (<main>
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
            onChange={e => { setValue(parseFloat(e.currentTarget.value)); }}
          />
          <Button onClick={applyMax}>Max</Button>
        </div>
        <div className='flex flex-col gap-3 items-center'>
          <Button className="w-full" variant="light" disabled={withdrawHidden} onClick={callContractSubmitWithdraw}>Submit Withdraw</Button>
          {availableFundsTime ? <p>Funds available in {availableFundsTime} hours</p> : null}
          <Button className="w-full" variant="light" disabled={claimHidden} onClick={callContractWithdraw}>Withdraw</Button>
          {availableFunds ? <p>{availableFunds} {pool.symbol} available to withdraw</p> : null}
        </div>
      </div>

    </section>
  </main>)
  function callContractSubmitWithdraw() {

  }
  function callContractWithdraw() {

  }
  function isAvailable() {
    //get data
    let data = getAvailableFunds()
    if (data) {
      setAvailableFunds(data.funds)
      setAvailableFundsTime(data.time)
    }
  }
  function applyMax() {
    setValue(0)
  }
  function getAvailableFunds(): { funds: number, time: number } {
    return { funds: 0, time: 0 }
  }
}

