import React from 'react'
import profile from '../assets/profile-2.jpg'
import Footer from '../Footer';


const About = () => {
  return (
    <>
      <div className='w-full mt-[100px]'>
        <div className='flex flex-wrap justify-center gap-20'>
          <div className='w-[600px] flex flex-col gap-3 p-6'>
            <h1 className='text-center font-bold text-[20px] mb-6'>About me</h1>
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
            <span className='font-bold'>Huzaifa Pachisa</span>
            <span className='font-medium'>Full-Stack developer</span>
            <a 
              href='https://huzaifa25a.site/' 
              target='_blank' 
              className='mt-[10px] border-2 px-2 py-1 hover:bg-[#b6b6b6c9] rounded-md hover:scale-105 transition-all duration-200'
            >
              Visit my portfolio
            </a>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default About