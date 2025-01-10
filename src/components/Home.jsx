import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import '../styles/home.css';
import { Link } from 'react-router-dom';

const limit = 6;
let defaultArray = []
function Home() {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalBtn, setTotalBtn] = useState([]);
  const [search, setSearch] = useState('');
  const [searchAray, setSearchArray] = useState([])
  const storeBookMark = JSON.parse(localStorage.getItem('bookmark_page')) || [];
 
  const paginatedItem = (array,page)=>{
    let newArray = []
    for(let i=((page*limit)-limit); i<page*limit; i++){
     if(array[i]){
        newArray.push(array[i]);
     }
    }
    setUserData(newArray)
  }
console.log(userData, 'userdata')
  const fetchUserData = async () => {
    fetch('https://api.github.com/users')
      .then((req) => req.json())
      .then((res) => {
        let btn = Math.ceil(res?.length / limit);
        let btnArray = [];

        for (let i = 1; i <= btn; i++) {
          btnArray.push(i);
        }
        setTotalBtn(btnArray)
        paginatedItem(res,page)
        defaultArray=[...res];       
      });
  };
  
  const handlePageClick = (ele) => {
    setPage(ele);
    
    paginatedItem(defaultArray, ele)
  }; 
const debounce = ()=>{
   
}
  const handleSearch = (value)=>{
     value
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div>
        <div><input type='text' onChange={(e)=>handleSearch(e.target.value)} placeholder='search by name'/> 
        <div>

        </div>
        </div>
        <div style={{display:"flex", gap:"20px"}}>
            <Link to='/'>Home</Link>
            <Link to='/bookmark'>Bookmark</Link>
        </div>
      </div>
      <div className="container">
        {userData?.map((element, index) => (
          <UserCard key={index} avtar_url={element?.avatar_url} login={element?.login} ele={element} bookmarked={storeBookMark.find(e => e.id == element.id)} />
        ))}
      </div>
      <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {
        totalBtn?.map((ele) => (
          <button onClick={()=>handlePageClick(ele)} style={{ cursor: 'pointor', border: '1px solid black', padding: '4px', marginRight: '4px' }}>{ele}</button>
        ))}
      </div>
    </>
  );
}

export default Home;
