import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='text-white flex justify-between p-4 bg-black'>
      <div className="logo font-bold text-2xl first-letter:text-red-500">
        XPASS
      </div>
      <ul>
        <li className='font-semibold text-lg flex justify-center items-center'>
          <NavLink className='flex justify-center gap-4' to='/' > Your Passwords
            <span>

              <lord-icon
                src="https://cdn.lordicon.com/umuwriak.json"
                trigger="loop"
                state="loop-cog"
                colors="primary:#ffffff"
              >
              </lord-icon>
            </span>
          </NavLink>
        </li>
      </ul>

    </nav>
  )
}

export default Navbar
