import React from 'react'
import Container from './Container'
import { Link } from 'react-router-dom'
// import { Link } from '../../node_modules/react-router-dom/dist/index'

const Header = () => {
  return (
    <header className='border-b border-black sticky top-0 left-0 w-full bg-white z-10'>
      <Container>
        <ul className='flex gap-4'>
          <li>
          <Link to="/">Home</Link>
          </li>
          <li>
          <Link to="/bookmarks">Bookmarks</Link>
          </li>
        </ul>
      </Container>
    </header>
  )
}

export default Header