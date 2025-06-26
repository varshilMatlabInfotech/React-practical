import React, { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';
import BookMarkCard from 'common/BookMarkCard/BookMarkCard';

const BookMark = () => {
  const [loading, setLoading] = useState(true);
  const [BookMarkData, setBookMarkData] = useState([]);
  const [SearchInput, SetSearchInput] = useState('');
  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(false);
        const resp = await axios.get('https://api.github.com/users');
        console.log('resp', resp);
        setBookMarkData(resp.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
    }
  }, []);
  console.log('BookMarkData', BookMarkData);

  const filterData = BookMarkData.filter((item) => item.login.toLowerCase().includes(SearchInput));
  console.log('filterData', filterData);
  return (
    <>
      {/* <div>BookMark</div> */}
      {/* <Tabs/> */}
      <div className="flex justify-center mb-4">
      <input
        type="text"
        name="SearchInput"
        value={SearchInput}
        id="SearchInput"
        className="p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => SetSearchInput(e.target.value)}
        placeholder="Search here..."
      />
      </div>
      <div className="gap-3 grid grid-cols-4">
        <BookMarkCard BookMarkData={filterData} loading={loading} />
      </div>
    </>
  );
};

export default BookMark;
