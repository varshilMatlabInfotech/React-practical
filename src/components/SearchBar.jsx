import { useEffect, useState, useMemo } from 'react';
import { debounce } from 'lodash';

const SearchBar = ({ onSearch, type }) => {
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);

  useEffect(() => {
    debouncedSearch(inputValue);
    return () => debouncedSearch.cancel();
  }, [inputValue]);

  return (
    <div className="mb-4 pt-[110px] sm:pt-[70px]">
      <input
        type="text"
        placeholder={type == 'users' ? 'Search users...' : 'Search bookmarks users...'}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
