import { useAccount, useEnsName } from 'wagmi'
import { useEffect, useState } from 'react'
import { fetchBalance } from '@wagmi/core'

export function Account() {
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const [addy, setAddy] = useState("")
  const [bal, setBal] = useState('')
  // const {address} = Account()

  useEffect(() => {
    const getBalance = async () => {
      const balance = await fetchBalance({
        address: address,
      })
      setBal(balance.formatted)
    }
    getBalance()
      .catch(console.error);
    // console.log(bal)
  })

  return (
    <div>
      {/* {ensName ?? address} */}
      {ensName ? ` (${address})` : null}
      <br />
      Account Balance: {bal} ETH 
      <br />
      ENS name: {ensName}
    </div>
  )
}
