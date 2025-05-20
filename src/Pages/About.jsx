import React from 'react'
import profile from '../assets/profile-2.jpg'

const About = () => {
  return (
    <div className='w-full mt-[100px]'>
      <div className='flex items-center justify-center gap-20'>
        <div className='w-[600px] flex flex-col gap-3'>
          <h1 className='text-center font-bold text-[20px] mb-2'>About me</h1>
          <span className='text-[16px]'>👋 Hi, I’m Huzaifa!</span>
          <span className='text-[16px] text-justify'>
            I love building fun and interesting projects and I’m on a journey to become a better developer every day.<br/>
            Feel free to check out my other work — I’m always experimenting with new ideas!<br/><br/>

            You can reach out to me anytime on LinkedIn, Email, or Instagram — I’m usually active on at least one of them 😛.<br/>
            Got a cool project idea or thinking about a collaboration? Let’s connect!<br/>
            And hey, if you need a personal website built, I’d be happy to help.<br/><br/>

            Thanks for stopping by — have an awesome day!
          </span>
        </div>
        <div className='flex flex-col items-center gap-1'>
          <img src={profile} alt='My profile Picture' className='rounded-[100%] bg-[#ffff] h-[400px] w-[400px] mb-[10px]'/>
          <span>Huzaifa Pachisa</span>
          <span>Full-Stack developer</span>
        </div>
      </div>
    </div>
  )
}

export default About