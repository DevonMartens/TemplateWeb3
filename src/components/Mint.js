import React, { useState, useRef, useEffect } from 'react'
import { ethers } from 'ethers'
import Mugstars from "../contract/mugstars.json"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'

const Mint = ({ account, networkID, provider, shortAcct }) => {

    const form = useRef()

    // let [, setContract] = useState()
    let [currentSupply, ] = useState(0)
    const [qty, setQty] = useState(1)
    const [nftPics, setNftPics] = useState([])

    const mintNow = () => {
        console.log(`Button clicked, account number ${account} wants to mint ${qty} NFT's`);     
        setQty(1);
    }

    const contract = new ethers.Contract(
        '0x04bf4ea0560f06e0ef5663c2b0eff29c195553b2',
        Mugstars.abi,
        provider
    );

    
    const getImages = async () => {
      
        for (let i = 0; i < currentSupply; i++) {
          const tokenId = await contract.methods.tokenOfOwner(account).call()
          console.log(tokenId)
      
          let tokenMetadataURI = await contract.methods.tokenURI(tokenId).call();
          console.log(tokenMetadataURI)
      
          if (tokenMetadataURI.startsWith("ipfs://")) {
            tokenMetadataURI = `https://ipfs.io/ipfs/${tokenMetadataURI.split("ipfs://")[1]}`
          }
      
          const tokenMetadata = await fetch(tokenMetadataURI).then(res => res.json())
          let tokenURL = await tokenMetadata['image']
          setNftPics(tokenURL)
          console.log(tokenURL)
        }
    }

    useEffect(() => {
        getImages()
    })

  return (
    <div className="mint"> 
       <div className="container col-xs-12">
           <div className="row m-auto">
               <form ref={form} action="submit" className="m-auto col-lg-5 col-md-8  col-lg-10w-100">
                   <div className="card p-5 text-center" id="wallet-address">

                        {/* <label className="m-2" htmlFor="amount">Please select the amount of NFTs to Mint</label> */}

                        <div className="mintLine">
                            <input className="py-1 ps-1 m-auto" type="number" name="amount"  value={qty} min="1" max="5" onInput={e => setQty(e.target.value)}/>
                            <Button onClick={ mintNow } className="mintBtn "> Mint / Buy </Button>
                        </div>

                        <label htmlFor=""> 0.06 ETH each </label>

                        <p className="mt-5"> Your Account Number: {shortAcct} </p>

                        {nftPics.map((pic) => (
                            <img src={pic} alt="nft"/>
                        ))}

                    </div>
               </form>
           </div>
       </div>
    </div>
  )
}

export default Mint