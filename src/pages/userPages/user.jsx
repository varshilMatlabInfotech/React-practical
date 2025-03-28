import React, { useState, useEffect } from 'react';

const User = () => {
  const [users, setUsers] = useState([]);
  const [userTab, setUserTab] = useState('allUsers');
  const [bookmarkUsers, setBookmarkUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchBookmark, setSearchBookmark] = useState('');
  const [page, setPage] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('https://api.github.com/users');
      const result = await response.json();

      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserTab = () => {
    setUserTab('allUsers');
  };
  const handleBookmarkTab = () => {
    setUserTab('bookmarkUser');
  };

  const handleLoadMore = () => {
    setPage(true);
  };

  const handleBookMark = (user) => {
    const bookmarked = bookmarkUsers.find((item) => item.id === user.id);
    if (!bookmarked) {
      setBookmarkUsers([...bookmarkUsers, user]);
    } 
  };

  const handleUnBookmark = (user) => {
    const bookmark = bookmarkUsers.find((item) => item.id === user.id);
    if (bookmark) {
      setBookmarkUsers(bookmarkUsers.find((item) => item.id !== user.id));
    } else {
      setBookmarkUsers([...bookmarkUsers, user]);
    }
  };

  const filterUser = users.filter((user, index) => user.login.toLowerCase().includes(search.toLowerCase()));
  const filterBookMark = bookmarkUsers.filter((user, i) => user.login.toLowerCase().includes(searchBookmark.toLowerCase()));
  return (
    <>
      <div>All user data</div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button onClick={handleUserTab}>Users</button>
        <button onClick={handleBookmarkTab}>Bookmark Users</button>
      </div>

      {userTab === 'allUsers' && (
        <>
          <div>
            <input type="text" placeholder="Search here" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <table>
            <thead>
              <tr>
                <td>Name </td>
                <td>Avatar Image</td>
                <td>Bookmark</td>
              </tr>
            </thead>
            <tbody>
              {filterUser.map((user, index) => (
                <tr key={index}>
                  <td>{user.login} </td>
                  <td>
                    <img src={user.avatar_url} alt="error" width="100" />
                  </td>
                  <td>
                    <button onClick={() => handleBookMark(user)}>Bookmark</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {userTab === 'bookmarkUser' && (
        <>
          <div>
            <input type="text" placeholder="Search here" value={searchBookmark} onChange={(e) => setSearchBookmark(e.target.value)} />
          </div>
          <table>
            <thead>
              <tr>
                <td>Name </td>
                <td>Avatar Image</td>
              </tr>
            </thead>
            <tbody>
              {filterBookMark.map((user, index) => (
                <tr key={index}>
                  <td>{user.login} </td>
                  <td>
                    <img src={user.avatar_url} alt="error" width="100" />
                  </td>
                  <td>
                    <button onClick={() => handleUnBookmark(user)}> UnBookmark </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default User;
