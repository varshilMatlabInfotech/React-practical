import User from 'components/User';
import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [bookmarkedUser, setBookmarkedUser] = useState([]);
  const [currentTab, setCurrentTab] = useState('list');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({ value: '', isCallable: false });
  const [filteredUsers, setFilteredUsers] = useState([]);

  const pageSize = 10;
  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  useEffect(() => {
    if (search.isCallable) {
      //   console.log('search>>>>>>>>>>');
      let timeoutId = setTimeout(() => {
        if (currentTab === 'list') {
          setFilteredUsers(userList.filter((item) => item.login.includes(search.value)));
        } else {
          setFilteredUsers(bookmarkedUser.filter((item) => item.login.includes(search.value)));
        }
      }, 300);

      return () => {
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [search]);

  useEffect(() => {
    if (userList && userList?.length) {
      //   console.log('bookmark>>>>>>>>>>');
      const newBookmarkedusers = userList.filter((user) => user.bookmark);
      setBookmarkedUser(newBookmarkedusers);
      setFilteredUsers(currentTab === 'list' ? userList : newBookmarkedusers);
    }
  }, [userList]);

  const fetchUsers = async () => {
    const userResponse = await fetch('https://api.github.com/users', {
      method: 'GET',
    });
    const userJSONResponse = await userResponse.json();
    // console.log('userJSONResponse>>>>', userJSONResponse);

    if (userJSONResponse && userJSONResponse?.length) {
      setUserList(userJSONResponse);
      setFilteredUsers(userJSONResponse);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePagination = (page) => {
    setPage(page);
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleTab = (tab) => {
    setCurrentTab(tab);
    search.value && setSearch({ ...search, value: '' });
    console.log('userList>>>', userList);
    setFilteredUsers(tab === 'list' ? userList : bookmarkedUser);
  };

  const handleSearch = (e) => {
    setSearch({ isCallable: true, value: e.target.value });
    setPage(1);
  };

  return (
    <div style={{ padding: '100px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => handleTab('list')} style={{ marginRight: '20px', color: currentTab === 'list' ? 'blue' : 'black' }}>
          List
        </button>
        <button onClick={() => handleTab('bookmarked')} style={{ color: currentTab === 'bookmarked' ? 'blue' : 'black' }}>
          Bookmarks
        </button>
      </div>

      <input type="search" value={search.value} onChange={handleSearch} style={{ border: '1px solid black', marginBottom: '30px' }} />

      <div>
        {currentTab === 'bookmarked' ? (
          filteredUsers.length ? (
            filteredUsers.map((user, i) => (
              <User key={user.id} user={user} userList={userList} filteredUsers={filteredUsers} setUserList={setUserList} />
            ))
          ) : (
            <p>No user bookmarked</p>
          )
        ) : filteredUsers.length ? (
          filteredUsers.slice(page * pageSize - pageSize, page * pageSize).map((user) => (
            <div key={user.id}>
              <User user={user} userList={userList} filteredUsers={filteredUsers} setUserList={setUserList} />
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
      {currentTab === 'list' && (
        <div style={{ width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'space-betweeen' }}>
          <button type="button" disabled={page <= 1} onClick={() => handlePagination(page - 1)} style={{ marginInline: '10px', padding: '10px' }}>
            Previous
          </button>
          <p style={{ marginInline: '10px', padding: '10px' }}>{page}</p>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => handlePagination(page + 1)}
            style={{ marginInline: '10px', padding: '10px' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;
