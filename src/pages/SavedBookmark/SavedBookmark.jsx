import BookMarkCard from 'common/BookMarkCard/BookMarkCard';
import React, { useState } from 'react'

const SavedBookmark = () => {
  const [SearchInput, SetSearchInput] = useState('');
  const existing = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const isFromSaveBookmark = true
  const filterData = existing.filter((item) => item.login.toLowerCase().includes(SearchInput));
  return (
    <div>
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
      <BookMarkCard BookMarkData={filterData} loading={true} isFromSaveBookmark={isFromSaveBookmark}/>
    </div>
    </div>
  )
}

export default SavedBookmark