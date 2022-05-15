import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import './App.css'
import SwimLogo from './images/swim-logo.png'
import Signature from './images/signature.png'
// import Mint from './components/Mint'
import Whitelist from './components/Whitelist'
import Social from './components/Social'


function App() {

  const [ethereumStatus, setEthereumStatus] = useState(false)
  // console.log(`It is ${ethereumStatus} that you are connected to MetaMask`)
  const [account, setAccount] = useState()
  const [shortAcct, setShortAcct] = useState()
  const [networkID, setNetworkID] = useState()

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  async function loadAccounts() {
  
    const accounts = await provider.listAccounts();
    setAccount(accounts[0])
  
    setShortAcct(String(accounts[0].substring(0,3) + "..." + accounts[0].substring(38)))
  }

  async function loadNetwork() {

    const { chainId } = await provider.getNetwork();
    setNetworkID(chainId)
  
  }
  
  useEffect(() => {
     loadAccounts()
     loadNetwork()
  })

  useEffect(()=> {

    if(window.ethereum){
      setEthereumStatus(true)
    } else {
      console.log("Not connected to MetaMask")
    }

    const changeInChainListener = async () => {

    await window.ethereum.on('accountsChanged', function(account) {
      setAccount(account);
      window.location.reload();
    })

    await window.ethereum.on('networkChanged', function (networkID) {
      setNetworkID(networkID);
      window.location.reload();
    })
  }

  changeInChainListener();

  }, [account, networkID, ethereumStatus])

  return (
    <div className="App">
      <img src={SwimLogo} alt="Swim Logo" className="swimLogo"/>
      <img src={Signature} alt="Bassy's Signature" className="bassyLogo"/>
      {/* <Mint account={account} networkID={networkID} provider={provider} shortAcct={shortAcct} /> */}
      <Whitelist account={account} networkID={networkID} shortAcct={shortAcct}/>
      <Social />
    </div>
  );
}

export default App;
