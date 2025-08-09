import React from 'react'

const Stats = () => {
  return (
    <section>
<div className='flex flex-col gap-10 md:flex-row justify-center items-center bg-accentDarkBlue text-[#ffffff]  md:gap-40'>
    <div >
        <p className='flex flex-col items-center text-lg font-semibold text-center gap-2'><span className='font-bold text-accentYellowDark text-5xl'>700+</span>participants: students, founders, and change-makers</p>
    </div>
    {/* <span className='border h-20 m-36'></span> */}
    <div>
        <p className='flex flex-col text-lg items-center font-semibold text-center gap-2' ><span className='font-bold text-accentYellowDark text-5xl' >10+</span> partner organizations</p>
    </div>
</div>
    </section>
  )
}

export default Stats