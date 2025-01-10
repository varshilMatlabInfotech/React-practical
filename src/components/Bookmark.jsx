import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import {Link} from 'react-router-dom'
function Bookmark() {
    const storeBookMark = JSON.parse(localStorage.getItem('bookmark_page')) || [];
    const [userData, setUserData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(()=>{
     let data = storeBookMark?.filter((el)=>el.bookmark==true)
     setUserData(data)
    },[])

  return (
    <div className="container">
       
        <div style={{display:"flex", gap:"20px"}}>
            <Link to='/'>Home</Link>
            <Link to='/bookmark'>Bookmark</Link>
        </div>
      
    {userData?.map((element, index) => (
      <UserCard key={index} avtar_url={element?.avatar_url} login={element?.login} Bookmarked={element.bookmark} />
    ))}
  </div>
  )
}

export default Bookmark