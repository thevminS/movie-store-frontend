import React from 'react'

function Video({url}:any) {
  return (
    <iframe
      src={url}
      frameborder="0"
      allowfullscreen
    />
  )
}

export default Video
