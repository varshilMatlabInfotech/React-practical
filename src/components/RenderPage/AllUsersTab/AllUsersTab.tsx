import { FetchUserData } from 'api/index';
import { SetStateAction, useEffect, useState } from 'react';
import { Box, Tab, Tabs, Grid } from '@material-ui/core';
import TableComponent from 'components/common/TableComponent/TableComponent';

export const AllUsersTab = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [bookmarkedUsers, setBookmarkedUsers] = useState<any[]>([]);
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
      FetchUserData()
        .then(response => {
          setUserData(response);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  }, []);

  const handleTabChange = ( newValue: SetStateAction<number>) => {
    setValue(newValue);
  };

  const handleBookmark = (user: any) => {
    setUserData(prevUsers => prevUsers.filter(u => u.id !== user.id));
    setBookmarkedUsers(prevBookmarked => [...prevBookmarked, user]);
  };

  const handleUnbookmark = (user: any) => {
    setBookmarkedUsers(prevBookmarked => prevBookmarked.filter(u => u.id !== user.id));
    setUserData(prevUsers => [user, ...prevUsers]);
  };

  const handleChangePage = ( newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let renderContent = (value: number) => {
    switch (value) {
      case 0:
        return (
          <Box sx={{ overflowX: 'auto' }}>
            <TableComponent
              users={userData}
              isBookmarked={false}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              handleBookmark={handleBookmark}
              handleUnbookmark={handleUnbookmark}
            />
          </Box>
        );
        break;
      case 1:
        return (
          <Box sx={{ overflowX: 'auto' }}>
            <TableComponent
              users={bookmarkedUsers}
              isBookmarked={true}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              handleBookmark={handleBookmark}
              handleUnbookmark={handleUnbookmark}
            />
          </Box>
        );
        break;
      default:
        return (
          <Box sx={{ overflowX: 'auto' }}>
            <TableComponent
              users={bookmarkedUsers}
              isBookmarked={true}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              handleBookmark={handleBookmark}
              handleUnbookmark={handleUnbookmark}
            />
          </Box>
        );
    }
  };
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Tabs value={value} onChange={handleTabChange} variant='fullWidth' centered indicatorColor='primary' textColor='primary'>
              <Tab label='All Users' />
              <Tab label='Bookmarked Users' />
            </Tabs>
          </Grid>
        </Grid>
        {renderContent(value)}
      </Box>
    </>
  );
};

export default AllUsersTab;
