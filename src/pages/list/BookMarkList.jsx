import Pagination from '@mui/material/Pagination';
import { MyContext } from 'contexts/index';
import React, { useContext, useEffect, useState } from 'react';

function BookMarkList() {
  const { data, setData, setBookMarkData, bookMarkData } = useContext(MyContext);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [newData, setNewData] = useState([]);
  const handleRemoveBookMark = (id) => {
    const filterData = bookMarkData.filter((i) => i?.id === id);
    setData([...data, ...filterData]);
    const filterBookMarkData = bookMarkData.filter((i) => i?.id !== id);
    setBookMarkData(filterBookMarkData);
  };

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
    setNewData(bookMarkData);
  }, [bookMarkData]);
  console.log('newData', newData);
  useEffect(() => {
    if (search === '') {
      console.log('bookMarkData', bookMarkData);
      setNewData([...newData, ...bookMarkData]);
    } else {
      const newDatas = newData.filter((value) => value?.login.toLowerCase().includes(search.toLowerCase()));
      setNewData(newDatas);
    }
  }, [search]);
  return (
    <div className="w-1/2 p-4">
      <div>BookMark Data</div>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search by name"
        className="border-solid px-2 py-1 my-4"
      />
      {newData?.map((item) => (
        <div className="flex gap-3 items-center">
          <img src={item?.avatar_url} alt="" className="h-14 w-14 rounded-full" />
          <div>{item?.login}</div>
          <button className="bg-red-400 px-2 py-1 text-white rounded-lg" onClick={() => handleRemoveBookMark(item?.id)}>
            Remove
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

export default BookMarkList;
