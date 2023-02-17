import { useEffect, useState } from 'react'
import { useAccount, useEnsName } from 'wagmi'
import { fetchBalance, fetchEnsName } from '@wagmi/core'

import { Account, Connect, NetworkSwitcher } from '../components'


function Page() {
  const { isConnected, address } = useAccount()
  const [addy, setAddy] = useState("")
  const [bals, setBals] = useState('')
  const [ens, setEnsName] = useState('')
  // const {address} = Account()

  useEffect(() => {
    const getBalance = async () => {
      const balance = await fetchBalance({
        address: addy,
      })
      //get ens name
      const ensName = await fetchEnsName({
        address: addy,
      })
      setEnsName(ensName)
      setBals(balance.formatted)
    }
    getBalance()
      .catch(console.error);
    // console.log(bal)
  })


  return (
    <>
      <h1>wagmi + Next.js</h1>
      <Connect />
      {isConnected && (
        <>
          <Account />
          <NetworkSwitcher />
        </>

      )}

      <br />

      <form onSubmit={(e) => {
        e.preventDefault()
        // setAddy(e.target.value)
        // sendTransaction?.()
      }}>
        <input
          onChange={(e) => setAddy(e.target.value)}
          aria-label="Account" placeholder="0xA0Cf…251e" />
        <button>fetch balance</button>
        <br />
        Account Balance: {bals} ETH
      </form>
      ENS Name: {ens}

    </>
  )
}

export default Page
