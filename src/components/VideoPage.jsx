import React from 'react'
import summit from "../assets/summit.mp4";

const VideoPage = () => {
  return (
    <section>
        <div>
            <video className='w-full' src={summit} controls autoPlay muted ></video>
        </div>
    </section>
  )
}

export default VideoPage;