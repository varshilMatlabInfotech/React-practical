import React, { useContext, useState } from 'react';
import { BookmarkContext } from '../contexts/bookmarkContext';
import { useThrottle } from '../utils/hokks';
import { useNavigate } from 'react-router-dom';

const Bookmark = () => {
  const { bookmarkedUsers, removeBookmark } = useContext(BookmarkContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const throttledSearch = useThrottle(searchTerm, 300);

  const filteredUsers = bookmarkedUsers.filter((user) => user.login.toLowerCase().includes(throttledSearch.toLowerCase()));
  const handleBook = () => {
    navigate('/');
  };
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Bookmarked Users</h2>
      <input placeholder="Search bookmarks" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ marginBottom: '1rem' }} />

      {filteredUsers.length === 0 && <p>No matching bookmarks.</p>}

      {filteredUsers.map((user) => (
        <div key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <img src={user.avatar_url} alt={user.login} width={50} height={50} style={{ borderRadius: '50%', marginRight: '1rem' }} />
          <span>{user.login}</span>
          <button onClick={() => removeBookmark(user.id)} style={{ marginLeft: 'auto' }}>
            Remove Bookmark
          </button>
        </div>
      ))}
      <div onClick={handleBook}>Go To MainPage</div>
    </div>
  );
};

export default Bookmark;
