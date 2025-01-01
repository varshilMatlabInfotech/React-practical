import { useDispatch, useSelector } from 'react-redux';
import { removeBookmark } from 'actions/actions';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DebouncedSearch from './DebouncedSearch';
import { useEffect, useState } from 'react';

export default () => {
  const dispatch = useDispatch();
  const bookmarkedUsers = useSelector((state) => state.user.bookmarkedUsers);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(bookmarkedUsers);
  }, [bookmarkedUsers]);

  const removeBookmarked = (id) => {
    dispatch(removeBookmark(id));
    alert('User has been remove successfully!!');
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
      headerAlign: 'center',
      sortable: false,
      width: 250,
    },
    {
      field: 'actions',
      type: 'actions',
      headerAlign: 'center',
      headerName: 'Actions',
      getActions: ({ id }) => {
        return [<Button onClick={() => removeBookmarked(id)}>RemoveBookmarked</Button>];
      },
      sortable: false,
      width: 250,
    },
  ];

  const handleSearch = (searchTerm) => {
    const filtered = bookmarkedUsers.filter((user) => user.login.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filtered);
  };
  return (
    <div>
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
    </div>
  );
};
