import { useEffect, useState } from 'react';
import { fetchUsers } from 'services/user.service';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import TextField from '@mui/material/TextField';
import { useDebounce } from 'customHooks/debounce';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [bookmarkedUser, setBookmarkedUser] = useState(JSON.parse(localStorage.getItem('bookmarkedUser') || '[]'));
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm.trim() === '') {
      setFilteredUsers(userList);
      return;
    }
    const filtered = userList.filter((user) => user.firstName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
    setFilteredUsers(filtered);
  }, [debouncedSearchTerm]);

  //   const {
  //     "login": "defunkt",
  //     "id": 2,
  //     "node_id": "MDQ6VXNlcjI=",
  //     "avatar_url": "https://avatars.githubusercontent.com/u/2?v=4",
  //     "gravatar_id": "",
  //     "url": "https://api.github.com/users/defunkt",
  //     "html_url": "https://github.com/defunkt",
  //     "followers_url": "https://api.github.com/users/defunkt/followers",
  //     "following_url": "https://api.github.com/users/defunkt/following{/other_user}",
  //     "gists_url": "https://api.github.com/users/defunkt/gists{/gist_id}",
  //     "starred_url": "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
  //     "subscriptions_url": "https://api.github.com/users/defunkt/subscriptions",
  //     "organizations_url": "https://api.github.com/users/defunkt/orgs",
  //     "repos_url": "https://api.github.com/users/defunkt/repos",
  //     "events_url": "https://api.github.com/users/defunkt/events{/privacy}",
  //     "received_events_url": "https://api.github.com/users/defunkt/received_events",
  //     "type": "User",
  //     "user_view_type": "public",
  //     "site_admin": false,
  //     "isBookmarked": true
  // }

  const fetchAllUsers = async () => {
    try {
      const result = await fetchUsers();
      await mapBookmarkedData(result.data.users, bookmarkedUser);
      //   setFilteredUsers(result.data);
      setUserList(result.data.users);
    } catch (error) {
      console.error('Error fetching Users', error);
    }
  };
  useEffect(() => {
    // setBookmarkedUser();
    fetchAllUsers();
  }, []);

  //   const mapBookmarkedData = (users) => {
  //     if (bookmarkedUser?.length > 0) {
  //       bookmarkedUser?.forEach((user) => {
  //         const bookmarkedUser = users.find((u) => u.id == user.id);
  //         if (bookmarkedUser) {
  //           users.find((u) => u.id == user.id).isBookmarked = true;
  //         }
  //       });
  //     }
  //   };

  const mapBookmarkedData = async (users, bookMarkedUsers) => {
    const updatedUsers = users.map((user) => {
      const isBookmarked = bookMarkedUsers.some((b) => b.id === user.id);
      return { ...user, isBookmarked: isBookmarked };
    });
    console.log('mapped data', updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const addUserToBookmarks = async (user) => {
    const updatedBookmarkedUsers = [...bookmarkedUser, { ...user, isBookmarked: true }];

    setBookmarkedUser(updatedBookmarkedUsers);
    localStorage.setItem('bookmarkedUser', JSON.stringify(updatedBookmarkedUsers));
    await mapBookmarkedData(filteredUsers, updatedBookmarkedUsers);
  };

  const removeFromBookmarks = async (user) => {
    const updatedBookmarkedUsers = bookmarkedUser.filter((u) => u.id !== user.id);

    setBookmarkedUser(updatedBookmarkedUsers);
    localStorage.setItem('bookmarkedUser', JSON.stringify(updatedBookmarkedUsers));
    await mapBookmarkedData(filteredUsers, updatedBookmarkedUsers);
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
          {params.row.isBookmarked ? (
            <BookmarkIcon onClick={() => removeFromBookmarks(params.row)} />
          ) : (
            <BookmarkAddOutlinedIcon onClick={() => addUserToBookmarks(params.row)}></BookmarkAddOutlinedIcon>
          )}

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
          rows={filteredUsers}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Box>
    </>
  );
};

export default UserList;
