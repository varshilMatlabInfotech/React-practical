import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { bookmark } from 'reducers/BookmarkReducer';
import ViewData from './ViewData';

const AllDataShow = () => {
    const [data,setData] =useState([]);
    const [search,setSearch] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
      axios.get('https://api.github.com/users')
      .then(function (response) {
        console.log(response);
        setData(response.data); 
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        
      });  
    }, [])

      
    const SearchedData = data.filter(item => item.login.toLowerCase().includes(search.toLocaleLowerCase())); //

  return (
    <div>
        <ViewData/>
<form className="max-w-md mx-auto">   
  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </svg>
    </div>
    <input type="search" value={search} 
      onChange={(e) => setSearch(e.target.value)} class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
     
  </div>
</form>


        {SearchedData.map((item,i) => (
           
          <a href="#" key={i} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={item.avatar_url} alt />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.login}</h5>
            <button className='bg-green-300' onClick={() => dispatch(bookmark(item.id))}>Bookmark</button>
          </div>
        </a>
        ))}
        
 



    </div>
  )
}

export default AllDataShow
