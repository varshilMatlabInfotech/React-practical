import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleBookmark } from "../redux/UserSlice";
import { debounce } from "lodash";
import { Button, Table } from "react-bootstrap";

const BookmarkedUsers = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  // Get bookmarked users from the Redux state
  const bookmarkedUsers = useSelector((state) =>
    state.users.users.filter((user) => user.bookmarked)
  );

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((term) => setSearchTerm(term), 300),
    []
  );

  // Filter users based on search input
  const filteredUsers = bookmarkedUsers.filter((user) =>
    user.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
     <input
        type="text"
        placeholder="Search BookMarked User"
        onChange={(e) => handleSearch(e.target.value)}
        className="form-control mb-3"
      />
      <Table striped bordered hover responsive className="text-center">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Profile</th>
                  <th>User Name</th>
                  <th> Action</th>
                </tr>
              </thead>
              {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
              <tbody>
                <tr>
                  <td>{user.id}</td>
                  <td> <img src={user.avatar_url} alt={user.login} className="rounded-circle" style={{height:'50px', width:'50px'}}/></td>
                  <td><span className="">{user.login}</span></td>
                  <td><Button className="" onClick={() => dispatch(toggleBookmark(user))}>
              {user.bookmarked ? "Unbookmark" : "Bookmark"}
            </Button></td>
                </tr>
              </tbody>
                ))
            ) : (
              <p>No bookmarked users</p>
            )}
            </Table>
  
    </div>
  );
};

export default BookmarkedUsers;
