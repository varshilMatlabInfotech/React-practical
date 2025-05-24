import React, { useState } from 'react';
import UserList from './component/UserList.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('users');
  const [searchText, setSearchText] = useState('');

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('users')}>Users</button>
        <button onClick={() => setActiveTab('bookmarked')}>Bookmarked Users</button>
        <input
          type="text"
          placeholder="Search users..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginLeft: '1rem' }}
        />
      </div>

      <UserList
        isBookmarkedTab={activeTab === 'bookmarked'}
        searchText={searchText}
      />
    </div>
  );
}

export default App;