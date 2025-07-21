import { useEffect, useState } from 'react';
import './home.css';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [localData, setLocalData] = useState([]);

  const fetchData = async () => {
    const userList = await fetch('https://api.github.com/users');
    const userData = await userList.json();
    setUsers(userData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    if (e.target.value) {
      const updatedUsers = users.filter((user) => {
        return user.login.includes(e.target.value);
      });
      setUsers(updatedUsers);
    } else {
      fetchData();
    }
  };

  const handleBookMark = (item) => {
    let a = [];
    let isDuplicate = false;

    const localData = JSON.parse(localStorage.getItem('bookmarkUsers'));

    if (localData) {
      isDuplicate = localData.some((user) => user.id === item.id);
    }

    if (localData && !isDuplicate) {
      a.push(...localData, item);
    } else if (isDuplicate) {
      a.push(...localData);
    } else {
      a.push(item);
    }

    localStorage.setItem('bookmarkUsers', JSON.stringify(a));
  };

  return (
    <>
      <div className="bookmarkLink">
        <a href="/bookmark">See All Bookmarks</a>
      </div>
      <div className="search">
        <label>
          Search: <input name="myInput" onChange={(e) => handleSearch(e)} />
        </label>
      </div>
      <div className="mainCardWrapepr">
        {users.map((item) => {
          return (
            <>
              <div className="card" key={item.id}>
                <img src={item?.avatar_url} className="userImage" />
                <h4>{item?.login}</h4>
                <button onClick={() => handleBookMark(item)} className="bookBtn">
                  Bookmark
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
