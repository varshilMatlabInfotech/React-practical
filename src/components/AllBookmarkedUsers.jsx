import React, { useMemo, useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DataTable from 'contexts/Table';

const AllBookmarkedUsers = ({ allUsers, setAllUsers }) => {
  console.log('000000allboo', allUsers);

  // const toggleBookmark = useCallback((userId) => {
  //   setAllUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, isBookmarked: !user.isBookmarked } : user)));
  // }, []);
  const toggleBookmark = (userId) => {
    setAllUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, isBookmarked: !user.isBookmarked } : user)));
  };

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'login', headerName: 'Name', width: 130 },
      {
        field: 'avatar_url',
        headerName: 'Avatar',
        sortable: false,
        width: 160,
        renderCell: (params) => <Avatar src={params?.value || ''}>{!params?.value && params?.row?.login?.charAt(0)}</Avatar>,
      },
      {
        headerName: 'Bookmark',
        width: 130,
        sortable: false,
        renderCell: ({ row }) => <span onClick={() => toggleBookmark(row.id)}>{row.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}</span>,
      },
    ],
    [toggleBookmark],
  );

  return <DataTable rows={allUsers} columns={columns} />;
};

export default AllBookmarkedUsers;
