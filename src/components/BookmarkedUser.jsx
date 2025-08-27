import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TextField from '@mui/material/TextField';
import { useDebounce } from 'customHooks/debounce';

const BookmarkedUserList = () => {
  const [bookmarkedUser, setBookmarkedUser] = useState(JSON.parse(localStorage.getItem('bookmarkedUser') || '[]'));
  const [filteredBookmarkedUser, setfilteredBBookmarkedUser] = useState(JSON.parse(localStorage.getItem('bookmarkedUser') || '[]'));
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm.trim() === '') {
      setfilteredBBookmarkedUser(bookmarkedUser);
      return;
    }
    const filtered = bookmarkedUser.filter((user) => user.firstName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
    setfilteredBBookmarkedUser(filtered);
  }, [debouncedSearchTerm]);

  const removeFromBookmarks = (user) => {
    const filteredUsers = bookmarkedUser.filter((u) => u.id !== user.id);
    setfilteredBBookmarkedUser(filteredUsers);
    localStorage.setItem('bookmarkedUser', JSON.stringify(filteredUsers));
    setBookmarkedUser(filteredUsers);
  };

  const columns = [
    {
      field: 'avatar',
      headerName: 'Profile',
      width: 100,
      renderCell: (params) => <Avatar alt={params.row.firstName} src={params.row.image} />,
      sortable: false,
      filterable: false,
    },
    { field: 'firstName', headerName: 'Login User Name', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div>
          <BookmarkIcon onClick={() => removeFromBookmarks(params.row)} />

          {/* <Button variant="contained" color="primary" size="small" style={{ marginRight: 8 }} onClick={() => console.log(params.row)}>
              BookMark
            </Button> */}
        </div>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField label="Search User" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredBookmarkedUser}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Box>
    </>
  );
};

export default BookmarkedUserList;
