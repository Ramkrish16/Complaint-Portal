import React from 'react'
import Myvideo from './image/videoplayback.mp4'
import "./temp.css"

function temp() {
  return (
    <div>
      <video width="100%" height="110%" autoPlay loop muted playsInline>
        <source src={Myvideo} type='video/mp4'></source>

      </video>

    </div>
  )
}

export default temp