import React, { useState, useContext, useEffect } from 'react';
import Context from '../context';
import Mint from '../components/Mint';

export default function Whitelist() {
  let { account } = useContext(Context);
  let [disabled, ] = useState(false);
  //let [btnText, setBtnText] = useState('Click to Join the Whitelist');
  let [networkMessage, setNetworkMessage] = useState();
  let [cursor, ] = useState('pointer');
  const { networkId } = useContext(Context);
  // const shortAcct=(String(account).substring(0,4) + "..." + String(account).substring(39) );
  

  let headers = new Headers();

  headers.append("Access-Control-Allow-Origin", "*");
  headers.append('Origin','http://localhost:3000');

  // async function joinWhiteList() {
    // setBtnText(`Adding ${shortAcct} to the Whitelist`)
  //   const data = {
  //     body: { 
  //       acct_num: String(account) 
  //     }
  //   };
  //   // console.log(data)
  //   await API.post('whitelistAPI', '/whitelist', data)
  //   .then(res => {
  //     // setBtnText(`Agent ${shortAcct} has been Whitelisted`);
  //     setDisabled(true);
  //     setCursor('no-drop')
  //     setNetworkMessage('')
  //   })
  //   .catch(error => {
  //     console.log(error)
  //     // setBtnText('Something went wrong. Try Again.')
  //   })
  // }

  useEffect(() => {
    if(networkId === 1 ) {
      setNetworkMessage("Enter your name and email below to get on the Whitelist")
    } 
    if(networkId === 5777) {
      setNetworkMessage(`You are connected to your localhost network.  Log in to the Etherium Mainnet to access the Whitelist.`)
    } 
    if(networkId === 3 ) {
      setNetworkMessage("You are connected to the Ropsten Test Network.  Log in to the Etherium Mainnet to access the Whitelist.")
    } 
    if(networkId === 42 ) {
      setNetworkMessage("You are connected to the Kovan Test Network.  Log in to the Etherium Mainnet to access the Whitelist.")
    } 
    if(networkId === 4 ) {
      setNetworkMessage(`You are connected to the Rinkeby Test Network. Log in to the Etherium Mainnet to access the Whitelist.`)
    } 
    if(networkId === 5 ) {
      setNetworkMessage("You are connected to the Goerli Test Network.  Log in to the Etherium Mainnet to access the Whitelist.")
    } 
    if(networkId === 1666600000 ) {
      setNetworkMessage("You are connected to the Harmony One Network.  Log in to the Etherium Mainnet to access the Whitelist.")
    } 
    if(networkId === "undefined" ) {
      setNetworkMessage("Log in to the Etherium Mainnet to access the Whitelist.")
    } 
  }, [networkId]);


  return (
    <>
        {/* <Network /> */}
        <Mint />
          { !account ? (
            <div style={{fontStyle: 'normal', padding: '2vh 0', margin: '0', fontWeight: '200', fontSize: '.8rem', color: 'black'}}>Sign in to your wallet to get access to the PreSale Whitelist</div>
          ) : account ? (
            <div className='whitelist'>
            <div style={{fontStyle: 'normal', padding: '0', margin: '0', fontWeight: '200', fontSize: '.8rem', textAlign: 'center', color: '#fff', margin: '2vh'}}>{ networkMessage }</div>
            { account && networkId === 1 ? (
              <div style={{display: "flex", flexDirection: "column", minWidth: '30vw'}}>
              <input type="text" placeholder="NAME*" required style={{padding: '1vh 1vw', margin: '.5vh 0'}}/>
              <input type="text" placeholder="EMAIL*" required style={{padding: '1vh 1vw', margin: '.5vh 0'}}/>
              <input type="text" placeholder={`${account}`} required readonly style={{padding: '1vh 1vw', margin: '.5vh 0', textAlign: 'center'}}/>
              <button 
              type='submit' 
              // onClick={
                // joinWhiteList
              // } 
                disabled={disabled} 
                style={{
                  padding: '1rem', 
                  color: "#fff", 
                  margin: '.5vh 0 5vh', 
                  border: 'none', 
                  backgroundColor: "#E21C21", 
                  cursor: `${cursor}`, 
                  height: 'auto',
                  width: '25%',
                  alignSelf: 'end'
                }}>
                  WHITELIST
                  </button>
                  </div>
            ) : (null)}
            
            </div>
          ) : (null)}
    </>
  )
}