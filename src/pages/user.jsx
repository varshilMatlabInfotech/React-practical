import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../utils/userAction';
import { BookmarkContext } from '../contexts/bookmarkContext';
import { useThrottle } from '../utils/hokks';
import { useNavigate } from 'react-router-dom';

const USERS_PER_PAGE = 5;

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading, error } = useSelector((state) => state.user);
  const { addBookmark, bookmarkedUsers } = useContext(BookmarkContext);

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const throttledSearch = useThrottle(searchTerm, 300);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => user.login.toLowerCase().includes(throttledSearch.toLowerCase()));
  }, [users, throttledSearch]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (page - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);

  const isBookmarked = (userId) => bookmarkedUsers.some((u) => u.id === userId);

  const nextPage = () => setPage((p) => (p < totalPages ? p + 1 : p));
  const prevPage = () => setPage((p) => (p > 1 ? p - 1 : p));

  useEffect(() => {
    setPage(1);
  }, [throttledSearch]);
  const handleBook = () => {
    navigate('/bookmark');
  };
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Users</h2>

      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />

      <button onClick={() => navigate('/bookmark')} style={{ marginBottom: '1rem' }}>
        Go to Bookmarks
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {paginatedUsers.length === 0 && !loading && <p>No users found.</p>}

      {paginatedUsers.map((user) => (
        <div key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <img src={user.avatar_url} alt={user.login} width={50} height={50} style={{ borderRadius: '50%', marginRight: 12 }} />
          <span>{user.login}</span>
          <button onClick={() => addBookmark(user)} disabled={isBookmarked(user.id)} style={{ marginLeft: 'auto' }}>
            {isBookmarked(user.id) ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      ))}

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
      <div>
        <button onClick={handleBook}>Booked Page</button>
      </div>
    </div>
  );
}

export default User;
