import { useEffect, useState } from 'react';

const Bookmark = () => {
  const [bookmarkList, setbookmarkList] = useState([]);

  const getLocatData = () => {
    const localData = localStorage.getItem('bookmarkUsers');
    const parseData = JSON.parse(localData);
    setbookmarkList(parseData);
  };

  useEffect(() => {
    getLocatData();
  }, []);

  const handleSearch = (e) => {
    if (e.target.value) {
      const updatedUsers = bookmarkList.filter((user) => {
        return user.login.includes(e.target.value);
      });
      setbookmarkList(updatedUsers);
    } else {
      getLocatData();
    }
  };

  return (
    <>
      <div className="search">
        <label>
          Search: <input name="myInput" onChange={(e) => handleSearch(e)} />
        </label>
      </div>
      <div className="mainCardWrapepr">
        {bookmarkList &&
          bookmarkList.map((item) => {
            return (
              <>
                <div className="card" key={item.id}>
                  <img src={item?.avatar_url} className="userImage" />
                  <h4>{item?.login}</h4>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Bookmark;
