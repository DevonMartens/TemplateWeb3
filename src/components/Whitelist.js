import React, { useState, useEffect, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import ReCAPTCHA from "react-google-recaptcha";

const Whitelist = ({account, networkID}) => {
    const form = useRef()

    const [networkMessage, setNetworkMessage] = useState();
    const [cursor, ] = useState("no-drop")
    const [disabled, setDisabled] = useState(true)
    const [btnText, setBtnText] = useState("WHITELIST COMING SOON")
    const [city, setCity]=useState("")
    const [country, setCountry]=useState("")
    const [countryCode, setCountryCode]=useState("")
    const [ipAddress, setIpAddress]=useState("")
    const [btnColor, setBtnColor]=useState("lightgrey")
    const [textColor, setTextColor]=useState("#000")

    const current = new Date()
 
    const url = process.env.REACT_APP_WHITELIST
    const geolocation_key = process.env.REACT_APP_KEY
    const recaptcha_key = process.env.REACT_APP_RECAPTCHA

    useEffect(() => {
      const getLocation = () => {
      fetch("https://geolocation-db.com/json/" + geolocation_key)
      .then( response => response.json() )
      .then( data => {
        setCity(data.city)
        setCountry(data.country_name)
        setCountryCode(data.country_code)
        setIpAddress(data.IPv4)
      })
     }
      getLocation()
    }, [geolocation_key])

    function onChange(value) {
      setDisabled(false)
      console.log("Captcha value:", value);
      if (value === null) {
        setDisabled(true)
      }
      }

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
      }, [networkID]);


    const joinWhitelist = (e) => {
      e.preventDefault();
      // window.grecaptcha.reset();
      setBtnText("Sending...")
      setDisabled(true)
      setBtnColor("lightgrey")
      setTextColor("#000")
      fetch(url, {
        header: 'Access-Control-Allow-Origin',
        method: "POST",
        body: new FormData(document.getElementById("join-whitelist"))
      })
        .then((response) => {
          setBtnText("Submission Sent");
          return response.json();
        })
        .then((data) => {
          console.log(data, "DATA")
        })
          .catch(error => {
            console.error(error.message, "ERROR.MESSAGE")
          }
      )
        form.current.reset();
      }

  return (
    <div className='whitelist'>
        { !account ? (
            <div className="message">Sign in to your wallet to get access to the PreSale Whitelist</div>
          ) : account ? (
            <div>
            <div className='message'>{ networkMessage }</div>
            { account && networkID === 1 ? (
              <Form method="POST" ref={form} id='join-whitelist' className="form" onSubmit={joinWhitelist}>
                <Form.Group className="fGroup">
                <Form.Control type="text" value={current} hidden name="TimeStamp" required readonly />
                <Form.Control type="text" name='Name' placeholder="NAME >>> John Smith" required />
                <Form.Control type="email" name='Email' placeholder="EMAIL >>> johnsmith@gmail.com" required />
                <Form.Control type="text" name='Discord' placeholder="DISCORD >>> johnny#0357" required />
                <Form.Control type="text" name='Wallet_Address' className="account" value={`${account}`} required readonly />
                <Form.Control type="text" value={city} hidden name="City" required readonly />
                <Form.Control type="text" value={country} hidden name="Country" required readonly />
                <Form.Control type="text" value={countryCode} hidden name="Country_Code" required readonly />
                <Form.Control type="text" value={ipAddress} hidden name="IP_Address" required readonly />
                </Form.Group>
                <Form.Group className="endForm">
                <ReCAPTCHA
                  sitekey={recaptcha_key}
                  onChange={onChange}
                  />
                <Button
                  className="submitBtn" 
                  type='submit' 
                  value='send'
                  disabled={disabled} 
                  style={{
                    cursor: `${cursor}`, 
                    backgroundColor: `${btnColor}`,
                    color: `${textColor}`
                    }}
                    >
                    {btnText}
                </Button>
                </Form.Group>
              </Form>
            ) : (null)}
            </div>
          ) : (null)}
    </div>
  )
}

export default Whitelist