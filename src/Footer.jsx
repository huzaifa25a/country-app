import React from 'react'
import gmail from '../src/assets/icons8-gmail.svg'
import linkedin from '../src/assets/icons8-linkedin.svg'
import github from '../src/assets/icons8-github.svg'

const Footer = () => {
  return (
    <div id='footer' className='mt-[40px] flex w-full bg-[#626262] items-center justify-center p-4'><hr/>
        <div className='flex flex-col items-center gap-2'>
            <span>Reach out to me on</span>
            <div className='flex gap-2 items-center'>
                <a href='mailto:pachisahuzaifa@gmail.com' target='_blank'>
                    <img src={gmail} alt='Gmail' className='h-[34px] transition-transform duration-200 hover:scale-110'/>
                </a>
                <a href='https://www.linkedin.com/in/huzaifa-pachisa-a0723a1b6/' target='_blank'>
                    <img src={linkedin} alt='LinkedIn' className='h-[34px] transition-transform duration-200 hover:scale-110'/>
                </a>
                <a href='https://github.com/huzaifa25a' target='_blank'>
                    <img src={github} alt='Github' className='h-[34px] transition-transform duration-200 hover:scale-110'/>
                </a>
            </div>
            <span>Created by Huzaifa P © 2025</span>
        </div>
    </div>
  )
}

export default Footer