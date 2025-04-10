import React, { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Bookmark = ({ setValue, userDataBookmark, setUserDataBookmark }) => {
  // User unbookmark to use this function
  const handleButtonClick = (data) => {
    // setUserData(userData.filter(task => task.id !== data.id));
  };

  // Table in data dynamic set
  const columns = useMemo(
    () => [
      {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
      },
      {
        name: 'User View Type',
        selector: row => row.user_view_type,
        sortable: true,
      },
      {
        name: 'Login Name',
        selector: row => row.login,
        sortable: true,
      },
      {
        cell: (row) => <img src={row?.avatar_url} alt={row?.avatar_url} style={{ height: "80px", width: "80px", border: "1px solid black", borderRadius: "50%" }} />,
      },
      {
        name: 'Action',
        cell: (row) => <Button variant="outlined" onClick={() => handleButtonClick(row)}><BookmarkIcon /></Button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    [userDataBookmark],
  );

  return (
    <>
      {/* Table */}
      <DataTable
        title="User bookmark"
        data={userDataBookmark}
        columns={columns}
      />
    </>
  )
}

export default Bookmark;