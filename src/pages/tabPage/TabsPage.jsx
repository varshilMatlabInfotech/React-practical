import React, { useState } from 'react';
import UsersPage from 'pages/user/UsersPage'; 
import BookmarkedPage from 'pages/user/BookmarkedPage'; 

function TabsPage() {
  const [activeTab, setActiveTab] = useState('users');  

  const handleTabClick = (tab) => {
    setActiveTab(tab);  
  };

  return (
    <div>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button 
          onClick={() => handleTabClick('users')}
          style={{ 
            padding: '10px', 
            backgroundColor: activeTab === 'users' ? 'lightblue' : 'white', 
            marginRight: '10px' 
          }}
        >
          Users
        </button>
        
        <button 
          onClick={() => handleTabClick('bookmarked')}
          style={{ 
            padding: '10px', 
            backgroundColor: activeTab === 'bookmarked' ? 'lightblue' : 'white'
          }}
        >
          Bookmarked
        </button>
      </div>

  
      <div>
        {activeTab === 'users' && <UsersPage />}
        {activeTab === 'bookmarked' && <BookmarkedPage />}
      </div>
    </div>
  );
}

export default TabsPage;
