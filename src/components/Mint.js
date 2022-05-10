import React, { useState, useEffect } from 'react'
import Mugstars from "../contract/mugstars.json"
import Web3 from 'web3'

const Mint = ({account, networkID, web3}) => {

    const [contract, setContract] = useState()
    let [currentSupply, setCurrentSupply] = useState(0)
    const [socketInstance, setSocketInstance] = useState()

    useEffect(() => {
        const getInfo = async () => {
            const this_contract = new web3.eth.Contract(
                Mugstars.abi,
                '0x04bf4ea0560f06e0ef5663c2b0eff29c195553b2',
            )
    
            setContract(this_contract)
    
        const web3socket = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'));
    
        const this_socket_instance = new web3socket.eth.Contract(
            Mugstars.abi,
            '0x04bf4ea0560f06e0ef5663c2b0eff29c195553b2',
        )
    
        setSocketInstance(this_socket_instance)
            const accounts = await web3.eth.getAccounts();

            setCurrentSupply(parseInt(await contract.methods.balanceOf(accounts[0]).call({ from: accounts[0]})));
        }
        getInfo()

}, [ contract.methods, web3.eth, currentSupply, socketInstance ])

  return (
    <div className="mint"> 
      <div>Current Supply: {currentSupply}</div> 
       <div>Network ID: {networkID}</div>
       <div>Account: {account}</div>
    </div>
  )
}

export default Mint