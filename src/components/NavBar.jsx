import React from 'react'
import FuzzyText from './FuzzyText'


const NavBar = () => {
  return (
    <header className='navbar'>
      <div className='inner'>
        <a className='logo' href='#hero'>
          <img src='public\images\person.png'/>
        </a>
        <nav className='desktop'>
  <ul>
  <li className='group' key="home">
    <a href='#hero'>
      <span>Home</span>
      <span className='underline' />
    </a>
  </li>
  <li className='group' key="projects">
    <a href='#projects'>
      <span>Projects</span>
      <span className='underline' />
    </a>
  </li>
  <li className='group' key="about">
    <a href='#about'>
      <span>About</span>
      <span className='underline' />
    </a>
  </li>
</ul>

        </nav>
        <a href='#contact' className='contact-btn group'>
          <div className='inner'>
            <span>Contact Us</span>
          </div>
        </a>

      </div>
    </header>

  )
}

export default NavBar