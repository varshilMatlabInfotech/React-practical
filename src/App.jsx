 
import React, { useState } from 'react';
import UsersTab from 'Components/UsersTab';
import BookmarksTab from 'Components/BookmarksTab';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <div className="flex border-b mb-4">
          <button
            className={`mr-4 pb-2 ${activeTab === 'users' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`pb-2 ${activeTab === 'bookmarks' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('bookmarks')}
          >
            Bookmarked Users
          </button>
        </div>
        {activeTab === 'users' ? <UsersTab /> : <BookmarksTab />}
      </div>
    </Provider>
  );
}

export default App;
