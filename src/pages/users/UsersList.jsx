import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addBookmark } from 'actions/actions';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DebouncedSearch from './DebouncedSearch';
import PullToRefresh from 'react-pull-to-refresh';

export default () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const bookmarkedUsers = useSelector((state) => state.user.bookmarkedUsers);
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const refreshPage = async () => {
    try {
      await dispatch(fetchUsers());
    } catch (error) {
      console.error('Error refreshing page:', error);
    }
  };

  const addToBookmarked = (value) => {
    const isExist = bookmarkedUsers.find((u) => u.id === value.id);
    if (isExist) {
      alert('User has been already bookmarked');
    } else {
      dispatch(addBookmark(value.row));
      alert('User has been successfully bookmark');
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = users.filter((user) => user.login.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filtered);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, headerAlign: 'center', sortable: false },
    {
      field: 'avatar_url',
      headerName: 'Avatar',
      headerAlign: 'center',
      sortable: false,
      width: 90,
      renderCell: (params) => <Avatar alt={params.row.avatar_url} src={params.value} />,
    },
    {
      field: 'login',
      headerName: 'Name',
      sortable: false,
      headerAlign: 'center',
      width: 250,
    },
    {
      field: 'actions',
      type: 'actions',
      headerAlign: 'center',
      headerName: 'Actions',
      getActions: (value) => {
        return [<Button onClick={() => addToBookmarked(value)}>Bookmarked</Button>];
      },
      sortable: false,
      width: 250,
    },
  ];
  return (
    <PullToRefresh onRefresh={refreshPage}>
      <Box sx={{ height: 400, width: '100%' }}>
        <DebouncedSearch label="Search record" onSearch={handleSearch} delay={300} style={{ marginBottom: 16 }} />
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </Box>
    </PullToRefresh>
  );
};
