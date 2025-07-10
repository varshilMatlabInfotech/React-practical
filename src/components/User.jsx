import React from 'react';

const User = ({ user, userList, setUserList, filteredUsers }) => {
  //   console.log(user.bookmark), setFilteredUsers;
  const handleBookmark = (user) => {
    setUserList(userList.map((item) => (item.id === user.id ? { ...item, bookmark: !user?.bookmark } : item)));
  };

  return (
    <div key={user.id}>
      <div
        style={{
          border: '1px solid black',
          marginBottom: '10px',
          display: 'flex',
          gap: '20px',
          // justifyContent: 'center',
          // alignItems: 'center',
          width: 'max-content',
          padding: '10px',
        }}
      >
        <img src={user.avatar_url} alt={user.avatar_url} style={{ width: '100px', borderRadius: '50%' }} />
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '5px' }}
        >
          <p>{user.login}</p>
          <button type="button" onClick={() => handleBookmark(user)}>
            {user.bookmark ? 'Bookmarked' : 'Add to Bookmark'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
