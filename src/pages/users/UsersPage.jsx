import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PullToRefresh from 'react-simple-pull-to-refresh';
import UserCard from '../../components/UserCard';
import SearchBar from '../../components/SearchBar';
import { loadUsers, resetUsers } from 'features/usersSlice';

const UsersPage = () => {
  const dispatch = useDispatch();
  const { list: users, loading, since } = useSelector((state) => state.users);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (users.length === 0) dispatch(loadUsers(0));
  }, [dispatch]);

  const handleRefresh = async () => {
    dispatch(resetUsers());
    dispatch(loadUsers(0));
  };

  const handleLoadMore = () => {
    dispatch(loadUsers(since));
  };

  const filteredUsers = users.filter((user) => user.login.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-4">
      <SearchBar type={'users'} onSearch={setSearchQuery} />
      <PullToRefresh onRefresh={handleRefresh}>
        <div>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <p className="text-center text-sm text-gray-500 mt-4">No users found related to Search.</p>
          )}

          {loading ? (
            <p className="text-center text-sm text-gray-500">Loading...</p>
          ) : filteredUsers.length > 5 ? (
            <button onClick={handleLoadMore} className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Load More
            </button>
          ) : (
            ''
          )}
        </div>
      </PullToRefresh>
    </div>
  );
};

export default UsersPage;
