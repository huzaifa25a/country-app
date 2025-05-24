import React from 'react'
import earth from '../assets/rotating_earth.gif'
import darkBg from '../assets/dark_bg.png'
import { NavLink } from 'react-router'
import Footer from '../Footer';


const Home = () => {
  return (
    <>
      <div 
          id='homeBg'
          style={{
              backgroundImage: `url(${darkBg})`, 
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }} 
            className='mt-[30px] flex w-full flex-wrap p-16 justify-center items-center gap-30'
        >
        <div className='flex flex-col gap-1'>
          <span className='text-[42px] font-bold'>Hey!</span>
          <span className='text-[28px] font-medium ml-[30px] mb-[10px]'>Welcome to</span>
          <span className='text-[36px] text-[#f4f5bb] ml-[-20px]'>World Explorer App</span>
        </div>
        <img id='rotating_earth' src={earth} alt='Rotating Earth' className='h-[480px]'/>
      </div>
      <div className='p-10 flex flex-col items-center justify-center gap-4'>
        <h2 className='text-[24px] font-semibold mb-[20px]'>🌍 World Explorer</h2>
        <span className='max-w-[650px] text-[18px] text-justify p-2'>
          Discover detailed information about every country on the planet — including flags, capitals, languages, currencies, population, and interactive maps.
          Start exploring and learn more about the world, one country at a time!
        </span>
        <span className='hover:bg-[#b6b6b6c9] p-2 rounded-md hover:scale-105 transition-all duration-200 text-[18px]'><NavLink to='/country'>View all countries</NavLink></span>
      </div>
      <Footer/>
    </>
  )
}

export default Home