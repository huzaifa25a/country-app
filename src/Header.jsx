import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../src/assets/logo.png'
import './index.css'

const Header = () => {
  return (
    <nav id='nav' className='fixed top-0 w-full h-auto z-50 bg-[#3a3a3a] border-b-2 border-[#2f2f2f] flex justify-between'>
      <NavLink to='/'>
        <div className='flex gap-2 items-center'>
          <img id='logo' src={logo} alt='logo' className='h-[64px]' />
          <span className=''>World Explorer App</span>
        </div>
      </NavLink>
      <ul className='flex gap-6 p-5 text-white'>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive
                ? 'border-b-2 border-white'
                : 'border-b-2 border-transparent'
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/Country'
            className={({ isActive }) =>
              isActive
                ? 'border-b-2 border-white'
                : 'border-b-2 border-transparent'
            }
          >
            Country
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/About'
            className={({ isActive }) =>
              isActive
                ? 'border-b-2 border-white'
                : 'border-b-2 border-transparent'
            }
          >
            About
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to='/Contact'
            className={({ isActive }) =>
              isActive
                ? 'border-b-2 border-white'
                : 'border-b-2 border-transparent'
            }
          >
            Contact
          </NavLink>
        </li> */}
      </ul>
    </nav>
  )
}

export default Header
