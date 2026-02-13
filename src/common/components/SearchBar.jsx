import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.users.searchTerm);

  return (
    <div className="relative w-full mb-6">
      <SearchIcon className="absolute left-4 top-3  text-gray-400" />
      <input
        type="text"
        placeholder="Search by login or name..."
        className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        value={searchTerm}
        onChange={(e) =>
          dispatch({
            type: 'SET_SEARCH',
            payload: e.target.value,
          })
        }
      />
      {searchTerm && searchTerm.length > 0 && (
        <ClearIcon
          className="absolute right-4 top-3 cursor-pointer text-gray-400 hover:text-gray-600"
          onClick={() => dispatch({ type: 'SET_SEARCH', payload: '' })}
        />
      )}
    </div>
  );
}
