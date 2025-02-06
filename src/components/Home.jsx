import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination.jsx';




const Home =()=>{
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const[addedData,setAddedData]=useState([])


  useEffect(() => {
    axios.get('https://api.github.com/users')
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

// const handleAdd=(data)=>{
//   const existingItem = addedData.find(item => item.id === data.id);
//   if (existingItem) {
//     alert('User already added');
//   } else {
//     setAddedData([...addedData, data]);
//   }
// }


  const handleAdd = (item) => {
    const existingItem = addedData.find((data) => data.id === item.id); // check if the item is already in the cart

    if (existingItem) {
      setAddedData(
        addedData.map((data) =>
          addedData.id === item.id
            ? { ...addedData, quantity: addedData.quantity + 1 }
            : addedData
        )
      );
    } else {
      setAddedData([...addedData, { ...item, quantity: 1 }]);
    }
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div clasName="flex justify-center ">

<div>
  <h2 className="text-2xl font-semibold text-gray-800"  >Users</h2>

      {
        data.map((item)=>{
          return(
            <div key={item.id} className="flex align-center gap-4 p-8  ">
              <img class="w-10 h-10 rounded-full" src={item.avatar_url}
                   alt="Rounded avatar" />
              <h1>{item.login}</h1>
              <button className="flex  bg-blue-500 justify-between text-white py-1 px-6 rounded" onClick={handleAdd}>Add</button>
            </div>
          )
        })
      }
  <Pagination

    length={data.length}

    postsPerPage={postsPerPage}

    handlePagination={handlePagination}

  />
</div>


        </div>
        )
      }
export default Home;