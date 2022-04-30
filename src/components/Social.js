import React from 'react'
import { SocialIcon } from 'react-social-icons'

const Social = () => {
  return (
    <div className='social'>
      <div className="socialButtons">
        <a href='https://www.marcebassy.com/about' target="_blank" rel="noreferrer noopener">
          <span className="spin">ABOUT</span>
        </a>
        <a  href= '#' target="_blank" rel="noreferrer noopener">
          <span className="spin">ROADMAP</span>
        </a>
        <a href='https://discord.gg/hUmjvUDF' target="_blank" rel="noreferrer noopener">
          <span className="spin">DISCORD</span>
        </a>
      </div>
      <div className="socialIcons">
        <a href='#' target="_blank" rel="noreferrer noopener">
         <SocialIcon bgColor="transparent" fgColor="white" url="https://www.instagram.com/marcebassy/?hl=en" className="icon"/>
        </a>
        
        <a  href= '#' target="_blank" rel="noreferrer noopener">
          <SocialIcon bgColor="transparent" fgColor="white" url="https://twitter.com/marcebassy" className="icon"/>
        </a>
        
        <a href='#' target="_blank" rel="noreferrer noopener">
          <SocialIcon bgColor="transparent" fgColor="white" url="https://open.spotify.com/artist/3tQx1LPXbsYjE9VwN1Peaa?autoplay=true&v=A" className="icon"/>
        </a>
      </div>
    </div>
  )
}

export default Social