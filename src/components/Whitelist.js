import React, { useState, useEffect } from 'react'

const Whitelist = ({account, networkID, shortAcct}) => {

    const [networkMessage, setNetworkMessage] = useState();
    const [cursor, setCursor] = useState("pointer")
    const [disabled, setDisabled] = useState(true)
    const [btnText, setBtnText] = useState("APPLY FOR WHITELIST")

    useEffect(() => {
        if(networkID === 1 ) {
          setNetworkMessage("Enter your name and email below to get on the Whitelist")
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
      }, [networkID]);


      function joinWhitelist() {
        console.log("button clicked")
        setCursor("no-drop")
        setDisabled(true)
        console.log(cursor)
        console.log(disabled)
        setBtnText("Submission Sent")
      }

  return (
    <div className='whitelist'>
        { !account ? (
            <div className="message">Sign in to your wallet to get access to the PreSale Whitelist</div>
          ) : account ? (
            <div>
            <div className='message'>{ networkMessage }</div>
            { account && networkID === 1 ? (
              <div className="form">
                <input type="text" placeholder="NAME >>> John Smith" required />
                <input type="email" placeholder="EMAIL >>> johnsmith@gmail.com" required />
                <input type="text" placeholder="DISCORD >>> johnny#0357" required />
                <input type="text" className="account" placeholder={`${shortAcct}`} required readonly />
                <button 
                  onClick={joinWhitelist} 
                  type='submit' 
                  disabled={disabled} 
                  style={{cursor: `${cursor}`}}>
                    {btnText}
                </button>
              </div>
            ) : (null)}
            </div>
          ) : (null)}
    </div>
  )
}

export default Whitelist