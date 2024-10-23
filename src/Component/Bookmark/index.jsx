import { Button } from 'bootstrap';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, setBookmark } from 'Store/UserSlice/index';
const Bookmark = () => {
  const { loading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleOnBookmark = (item) => {
    const changeBookmarkStatus = user.map((userItem) => {
      userItem.id === item ? { ...userItem, bookmark: true } : userItem;
    });
    dispatch(setBookmark(changeBookmarkStatus));
    console.log(user);
  };
  return (
    <>
      <div>
        {loading === 'pending' ? (
          <h1>Loading...</h1>
        ) : (
          user
            .filter((item) => item.bookmark === false)
            .map((item) => {
              return (
                <div id="card">
                  <img src={item.avatar_url} alt="avatar" width="100" height="100" className="card-image" />
                  <h1>{item.login}</h1>
                  <h1>{item.id}</h1>
                  <button onClick={() => handleOnBookmark(item?.id)}>bookmark</button>
                </div>
              );
            })
        )}
      </div>
    </>
  );
};

export default Bookmark;
