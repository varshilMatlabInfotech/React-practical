import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, toggleBookmark } from "../redux/UserSlice";
import { debounce } from "lodash";
import { Button, Table, Pagination, Container } from "react-bootstrap";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Pull-to-refresh functionality
  useEffect(() => {
    const handleRefresh = (event) => {
      if (window.scrollY === 0 && event.touches[0].clientY > 10) {
        window.location.reload();
      }
    };

    window.addEventListener("touchmove", handleRefresh);

    return () => {
      window.removeEventListener("touchmove", handleRefresh);
    };
  }, []);


  const handleSearch = useCallback(
    debounce((term) => setSearchTerm(term), 300),
    []
  );

  const filteredUsers = users.filter((user) =>
    user.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <input
        type="text"
        placeholder="Search Users"
        onChange={(e) => handleSearch(e.target.value)}
        className="form-control mb-3"
      />

      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Profile</th>
            <th>User Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td><img src={user.avatar_url} alt={user.login} className="rounded-circle" style={{ height: '50px', width: '50px' }} /></td>
              <td>{user.login}</td>
              <td>
                <Button variant={user.bookmarked ? "danger" : "success"} onClick={() => dispatch(toggleBookmark(user))}>
                  {user.bookmarked ? "Unbookmark" : "Bookmark"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNumber = Math.max(1, currentPage - 2) + i;
          return pageNumber <= totalPages ? (
            <Pagination.Item key={pageNumber} active={pageNumber === currentPage} onClick={() => paginate(pageNumber)}>
              {pageNumber}
            </Pagination.Item>
          ) : null;
        })}
        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
      
      {loading && <p>Loading...</p>}
      {error && <p>Error loading users</p>}
    </Container>
  );
};

export default Users;
