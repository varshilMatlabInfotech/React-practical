import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import { toast } from 'react-toastify';
import CardFolder from 'common/enums/Card';
import SearchBar from 'common/enums/SearchBar';

const User = () => {
  const [loading, setLoading] = useState(false);
  const [useData, setUserData] = useState([]);
  const [bookMarkData, setBookMarkData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.github.com/users');
      setUserData(response?.data);
      toast.success('Data fetched successfully');
    } catch (error) {
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = (user) => {
    const updatedBookmarks = [...bookMarkData, user];
    setBookMarkData(updatedBookmarks);
    localStorage.setItem('Bookmark', JSON.stringify(updatedBookmarks));
    const updatedUserList = useData.filter((item) => item.id !== user.id);
    setUserData(updatedUserList);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getUser();
  }, []);

  const filteredData = useData.filter((user) => user.login.toLowerCase().includes(searchTerm.toLowerCase()));

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div style={{ padding: '20px' }}>
      {SearchBar(handleSearch, searchTerm)}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {loading ? (
          'Loading...'
        ) : currentUsers.length > 0 ? (
          currentUsers.map((data) => CardFolder(data, handleBookmark))
        ) : (
          <Typography>No users found</Typography>
        )}
      </div>

      {filteredData?.length > usersPerPage && (
        <Pagination
          count={Math.ceil(filteredData.length / usersPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}
        />
      )}
    </div>
  );
};

export default User;
