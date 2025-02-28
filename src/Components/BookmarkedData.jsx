import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { reset } from 'reducers/BookmarkReducer';
import ViewData from './ViewData';

const BookmarkedData = () => {
    const {value} = useSelector((state) => state.bookmarkApp)
     
   
  const [item,setItem] =useState([]);
  const dispatch = useDispatch();
   
       useEffect(() => {
         axios.get(`https://api.github.com/users/${value}`)
        .then(function (response) {
           setItem(response.data); 
         })
        .catch(function (error) {
           console.log(error);
         })
        .finally(function () {
           
         });  
       }, [value])

  return (
    <div>
        <ViewData/>

 
               {value !== null &&(
  <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
  <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={item.avatar_url} alt />
  <div className="flex flex-col justify-between p-4 leading-normal">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
    <button className='bg-green-300' onClick={() => dispatch(reset())}> remove Bookmark</button>
  </div>
</a>
               )}
            
         
    </div>
  )
}

export default BookmarkedData
