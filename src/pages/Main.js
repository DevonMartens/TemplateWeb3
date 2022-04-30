import React from 'react'
import SwimLogo from '../images/swim-logo.png'
import Whitelist from '../components/Whitelist'
import Social from '../components/Social'

const Main = () => {
  return (
    <>
    <img src={SwimLogo} alt="Swim Logo" width="200px" style={{position:"absolute", top:"0", left:"0", paddingTop: "2vh"}}/>
    <Whitelist />
    <Social />
    </>
  )
}

export default Main