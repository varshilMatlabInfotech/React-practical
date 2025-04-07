import React from 'react'

const SearchBox = ({onChange}) => {
  return (
    <input type="search" className='border border-black rounded-md px-4 py-2' placeholder='Search...' onChange={onChange} />
  )
}

export default SearchBox