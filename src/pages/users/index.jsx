import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [visible, setVisible] = useState(7);
  const [searchVal, setSearchVal] = useState('');

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 7);
  };

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
  };

  useEffect(() => {
    axios
      .get('https://api.github.com/users')
      .then((response) => response.data)
      .then((data) => {
        setUserDetails(data);
      });
  }, []);

  return (
    <>
      <div className="flex gap-5">
        <h5>User Details</h5>
        <h5>BookMark Users</h5>
      </div>
      <input type="text" placeholder="Search..." value={searchVal} onChange={handleSearch} />
      <div className="flex flex-col">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 sm:px-6 lg:px-8">
            {userDetails?.slice(0, visible).map((item) => (
              <table className="text-left text-sm font-light" key={item.id}>
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th>Profile Image</th>
                    <th>User Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-neutral-500">
                    <td className="px-6 py-4 font-medium">
                      <img src={item.avatar_url} alt="profile" className="h-16 w-16 rounded-full" />
                    </td>
                    <td>{item.login}</td>
                    <td>
                      <button onClick={() => {}}>Add to Bookmark</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
            <div className="flex flex-col pt-8">
              <button onClick={showMoreItems}>Load More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
