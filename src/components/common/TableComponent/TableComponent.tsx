import React from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Grid,
} from '@material-ui/core';
import { Avatar } from '@mui/material';

interface TableComponentProps {
  users: any[];
  isBookmarked: boolean;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: any, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBookmark: (user: any) => void;
  handleUnbookmark: (user: any) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  users,
  isBookmarked,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  handleBookmark,
  handleUnbookmark,
}) => {
  const currentPageUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPageUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align='center'>
                <Typography variant='h6' color='textSecondary'>
                  No users available.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            currentPageUsers?.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Grid container alignItems='center' spacing={2}>
                    <Grid item>
                      <Avatar alt={user.login} src={user.avatar_url} />
                    </Grid>
                    <Grid item>{user?.login}</Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  {isBookmarked ? (
                    <Button variant='contained' color='secondary' onClick={() => handleUnbookmark(user)}>
                      Unbookmark
                    </Button>
                  ) : (
                    <Button variant='contained' color='primary' onClick={() => handleBookmark(user)}>
                      Bookmark
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default TableComponent;
