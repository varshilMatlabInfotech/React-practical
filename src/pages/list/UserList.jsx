import Pagination from '@mui/material/Pagination';
import { MyContext } from 'contexts/index';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const { data, setData, setBookMarkData, bookMarkData } = useContext(MyContext);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.github.com/users');
      console.log('response', response);
      setData(response?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  const handleClickBookMark = (id) => {
    const filterData = data.filter((i) => i?.id !== id);
    setData(filterData);
    const filterBookMarkData = data.filter((i) => i?.id === id);
    setBookMarkData([...bookMarkData, ...filterBookMarkData]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (searchValue === '') {
      fetchData();
    }
    const newData = data?.filter((value) => value?.login.toLowerCase().includes(searchValue.toLowerCase()));
    setData(newData);
  }, [searchValue]);

  return (
    <div className="w-1/2 p-4">
      <div>User List</div>
      <input
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        placeholder="Search by name"
        className="border-solid px-2 py-1 my-4"
      />
      {isLoading
        ? 'Loading'
        : currentItems?.map((item) => (
            <div className="flex gap-3 items-center">
              <img src={item?.avatar_url} alt="" className="h-14 w-14 rounded-full" />
              <div>{item?.login}</div>
              <button className="bg-red-400 px-2 py-1 text-white rounded-lg" onClick={() => handleClickBookMark(item?.id)}>
                BookMark
              </button>
            </div>
          ))}
      <button onClick={handlePreviousPage} className="bg-blue-600 text-white mx-2 px-2 py-1 rounded-lg mt-4">
        Previous
      </button>
      <button onClick={handleNextPage} className="bg-blue-600 text-white mx-2 px-2 py-1 rounded-lg">
        Next
      </button>
    </div>
  );
}

export default UserList;
