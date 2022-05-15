import { useState, useEffect } from 'react'

const Network = ({networkID}) => {

  const [networkMessage, setNetworkMessage] = useState("")

  useEffect(() => {
    if(networkID === 1 ) {
      setNetworkMessage("Enter your information below to get on the Whitelist")
    } 
    if(networkID === 5777) {
      setNetworkMessage(`You are connected to your localhost network.  Log in to the Etherium Mainnet to access the Whitelist.`)
    } 
    if(networkID === 3 ) {
      setNetworkMessage("You are connected to the Ropsten Test Network.  Log in to the Etherium Mainnet to access the Whitelist.")
    } 
    if(networkID === 42 ) {
      setNetworkMessage("You are connected to the Kovan Test Network.  Log in to the Etherium Mainnet to access the Whitelist.")
    } 
    if(networkID === 4 ) {
      setNetworkMessage(`You are connected to the Rinkeby Test Network. Log in to the Etherium Mainnet to access the Whitelist.`)
    } 
    if(networkID === 5 ) {
      setNetworkMessage("You are connected to the Goerli Test Network.  Log in to the Etherium Mainnet to access the Whitelist.")
    } 
    if(networkID === 1666600000 ) {
      setNetworkMessage("You are connected to the Harmony One Network.  Log in to the Etherium Mainnet to access the Whitelist.")
    } 
    if(networkID === "undefined" ) {
      setNetworkMessage("Log in to the Etherium Mainnet to access the Whitelist.")
    } 
  }, [networkID])
        
  return (
    <div className="network">
      <p className='message' > {networkMessage} </p>
    </div>


  )

}

export default Network