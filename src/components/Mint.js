import React, { Component } from "react";
import Web3 from "web3";
import Mugstars from "../contract/mugstars.json";
import getWeb3 from "./getWeb3";
import Context from '../context';

class Mint extends Component {

  static contextType = Context;

  state = { storageValue: 0, web3: null, accounts: null, contract: null, currentSupply: 0 }; 


  componentDidMount = async () => {

    try {
      const { setUser } = this.context;
      const { setAccount } = this.context;
      let { currentSupply, setCurrentSupply } = this.context;
      let { networkId, setNetworkId } = this.context;
      
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      //provider
      const web3socket = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'));
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      // Get the contract instance.
      networkId = await web3.eth.net.getId();

      setNetworkId(networkId);
      // const deployedNetwork = networkId;
      const instance = new web3.eth.Contract(
        Mugstars.abi,
        '0x04bf4ea0560f06e0ef5663c2b0eff29c195553b2',
      );

      //Contract
      const socketInstance = new web3socket.eth.Contract(
        Mugstars.abi,
       '0x04bf4ea0560f06e0ef5663c2b0eff29c195553b2',
      );

      // console.log(socketInstance, "socketInstance")
      currentSupply = parseInt(await instance.methods.balanceOf(accounts[0]).call({ from: accounts[0]}));
 
      this.setState({ web3, accounts, contract: instance, currentSupply, quantity: 1 });

      setCurrentSupply(currentSupply);

      console.log(`you currently own ${currentSupply} MugStar NFT`)

      const user = { currentSupply };
      setUser(user);

      window.ethereum.on('accountsChanged', function(account) {
        setAccount(account);
        window.location.reload();
      })

      window.ethereum.on('networkChanged', function (networkId) {
        setNetworkId(networkId)
        window.location.reload();
      })

      const component = this;

      socketInstance.events.Transfer({
        fromBlock: 0
      }, function (error, event) {
        if (error) throw error;
        // componentState
        let tokenId = event.returnValues.tokenId
        if(parseInt(tokenId) > parseInt(currentSupply))
        component.setState({ currentSupply: tokenId })
      })
    } catch (error) {
      if (error) throw error
    }

    
  };


async mintNFT(e) {
  e.preventDefault()

  const {accounts, contract, web3, quantity} = this.state

  let each = parseInt(await contract.methods.Price().call());

  let eachPrice = web3.utils.fromWei(String(each), 'wei');
  console.log("Price: ", eachPrice)

  let price = parseInt(eachPrice * quantity);

  await contract.methods.mintNFT(quantity).send({
    from: accounts[0],
    value: parseInt(price)
  })
};

nftIDs() {
  let ids = [...Array(parseInt(this.state.currentSupply) + 1).keys()]
  ids.shift()
  return ids
};



setQuantity(e){
  this.setState({quantity: e.target.value})
}

  render() {

    const shortAcct=(String(this.context.account).substring(0,5) + "..." + String(this.context.account).substring(38) )

    const { accounts, contract, currentSupply } = this.state

    const getImages = async () => {
      
      for (let i = 0; i < currentSupply; i++) {
        const tokenId = await contract.methods.tokenOfOwnerByIndex(accounts[0], i).call()
    
        let tokenMetadataURI = await contract.methods.tokenURI(tokenId).call();
    
        if (tokenMetadataURI.startsWith("ipfs://")) {
          tokenMetadataURI = `https://ipfs.io/ipfs/${tokenMetadataURI.split("ipfs://")[1]}`
        }
    
        const tokenMetadata = await fetch(tokenMetadataURI).then(res => res.json())
        let tokenURL = await tokenMetadata['image']
        console.log(tokenURL)
      }
  }

    getImages();

    return (
      <>
         { shortAcct === "null..." || shortAcct === "undef..." ? (
            <div>Log in to your ethereum wallet to access Minting</div>
            ) : this.state.currentSupply === 0 ? (
            <>
            {/* <div>Bond Acct: { shortAcct } </div> */}
              {/* <div> You own zero NFTs.</div>
              <select name="count" id="count" onChange={this.setQuantity.bind(this)} value={this.value}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
              </select>&nbsp;
            <Button href="#" className="MintNowBtn" onClick={this.mintNFT.bind(this)}>Mint {this.state.quantity} Now</Button> */}
            </>
            ) : this.state.currentSupply === 1 ? (
              <>
              {/* <div>Bond Acct: { shortAcct } </div> */}
              {/* <h3> You own {this.state.currentSupply} NFT</h3>
              <select name="count" id="count" onChange={this.setQuantity.bind(this)} value={this.value}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
              </select>&nbsp;
            <Button href="#" className="MintNowBtn" onClick={this.mintNFT.bind(this)}>Mint {this.state.quantity} Now</Button>
                <br />
            <MembersOnly /> */}
              </>
            ) : (
              <>
              {/* <div>Bond Acct: { shortAcct } </div> */}
              {/* <h5> You own {this.state.currentSupply} NFTs</h5>
              <select name="count" id="count" onChange={this.setQuantity.bind(this)} value={this.value}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
              </select>&nbsp;
            <Button href="#" className="MintNowBtn" onClick={this.mintNFT.bind(this)}>Mint {this.state.quantity} Now</Button>
              {/* <br /> */}
            {/* <MembersOnly href='/MembersOnly'/> */}
              </>
            )
          } 
          </>
          )
       }}


export default Mint;