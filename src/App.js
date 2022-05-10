/* eslint-disable */

import { useState, useEffect } from 'react'
import Web3 from 'web3'
import './App.css'
import SwimLogo from './images/swim-logo.png'
import Signature from './images/signature.png'
import Mint from './components/Mint'
// import Whitelist from './components/Whitelist'
import Social from './components/Social'


function App() {

  const [account, setAccount] = useState()
  const [, setShortAccount] = useState()
  const [networkID, setNetworkID] = useState()



  const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')

  async function loadAccounts() {
  
    const accounts = await web3.eth.requestAccounts();
    setAccount(String(accounts[0]))
  
    setShortAccount(String(accounts[0].substring(0,3) + "..." + accounts[0].substring(38)))
  }

  async function loadNetwork() {

    const networkID = await web3.eth.net.getId()
    setNetworkID(networkID)
  
  }
  
  useEffect(() => {
     loadAccounts()
     loadNetwork()
  }, [])

  useEffect(()=> {
    const changeInChainListener = async () => {

    await window.ethereum.on('accountsChanged', function(account) {
      setAccount(account);
      window.location.reload();
    })

    await window.ethereum.on('networkChanged', function (networkID) {
      setNetworkID(networkID)
      window.location.reload();
    })
  }

  changeInChainListener()

  }, [account, networkID])

  return (
    <div className="App">
      <img src={SwimLogo} alt="Swim Logo" className="swimLogo"/>
      <img src={Signature} alt="Bassy's Signature" className="bassyLogo"/>
      <Mint account={account} networkID={networkID} web3={web3}/>
      {/* <Whitelist account={account} networkID={networkID} shortAcct={shortAcct}/> */}
      <Social />
    </div>
  );
}

export default App;
