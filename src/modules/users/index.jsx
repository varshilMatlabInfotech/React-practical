import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, fetchUsers, removeBookmark } from 'reducers/userSlice';

const Users = ({ userType = 1 }) => {
  const dispatch = useDispatch();

  const { users, bookmarkUsers } = useSelector((state) => state.user);

  const [userList, setUserList] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState([]);
  const pageSize = 5;

  useEffect(() => {
    if (userType === 1) {
      setUserList(users?.slice((pageNumber - 1) * pageSize, (pageNumber - 1) * pageSize + pageSize));
    } else {
      setUserList(bookmarkUsers?.slice((pageNumber - 1) * pageSize, (pageNumber - 1) * pageSize + pageSize));
    }
  }, [userType, users, bookmarkUsers, pageNumber]);

  const handleAddBookmark = (id) => {
    dispatch(addBookmark(id));
  };

  const handleRemoveBookmark = (id) => {
    dispatch(removeBookmark(id));
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text === '') {
      setSearchList([]);
    } else {
      setSearchList(userList?.filter((user) => user?.login?.includes(text)));
    }
  };

  const Users = useCallback(
    ({ list }) => {
      return (
        <>
          {list?.length ? (
            list?.map((user) => {
              return (
                <>
                  <div key={user?.id} className="mt-2 row text-center align-items-center justify-content-center">
                    <div className="avatar col-2">
                      <img src={user?.avatar_url} alt={user?.login} />
                    </div>
                    <div className="col-8">{user?.login}</div>
                    <div className="col-2">
                      <button
                        className="btn btn-secondary"
                        id={user?.id}
                        onClick={() => {
                          if (userType === 1) {
                            handleAddBookmark(user?.id);
                          } else {
                            handleRemoveBookmark(user?.id);
                          }
                        }}
                      >
                        {userType === 1 ? 'Add to bookmark' : 'Add to user'}
                      </button>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <h3 className="text-center">No users found</h3>
          )}
        </>
      );
    },
    [userList, searchList],
  );

  return (
    <>
      <h1 className="text-center"> List of {userType === 1 ? '' : 'Bookmarked'} Users </h1>
      <input
        type="search"
        placeholder="Search"
        className={'mt-4 border border-secondary'}
        name="search"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="mt-4">
        <div className="mt-2 row text-center">
          <div className="col-2">Avatar</div>
          <div className="col-8">Login Name</div>
          <div className="col-2">Action</div>
        </div>
      </div>
      <Users list={!!search?.length ? searchList : userList} />
      <div className="mt-4 d-flex gap-2 align-items-center justify-content-center">
        <button type="button" style={{ width: '150px', color: '#000' }} className="btn btn-primary" onClick={() => handlePreviousPage()}>
          Previous
        </button>
        <span>{pageNumber}</span>
        <button type="button" style={{ width: '150px', color: '#000' }} className="btn btn-primary" onClick={() => handleNextPage()}>
          Next
        </button>
      </div>
    </>
  );
};

export default Users;
