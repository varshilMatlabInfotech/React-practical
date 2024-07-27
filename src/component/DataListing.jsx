import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useDispatch, useSelector } from 'react-redux';
import { handleBookMark } from 'Redux/BookMarkSlice';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const DataListing = () => {
  const dispatch = useDispatch();
  const bookMark = useSelector((state) => state.bookMark.bookMark);
  console.log('bookMark', bookMark);

  const [data, setData] = useState([]);
  console.log('data', data);
  const [searchQuery, setSearchQuery] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get('https://api.github.com/users')
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleMark = (data) => {
    dispatch(handleBookMark([...bookMark, data]));
  };

  const handleOnChange = (e, page) => {
    setPage(page);
  };

  const search_params = Object.keys(Object.assign({}, ...data));

  const search=(data)=> {
    return data.filter((data) => search_params.some((param) => data['login'].toString().toLowerCase().includes(searchQuery)));
  }

  return (
    <>
      <TextField label="Search" variant="outlined" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search user" />
      <table style={{ width: '100%' }}>
        <tr>
          <th style={{ border: '1px solid black' }}>Name</th>
          <th style={{ border: '1px solid black' }}>Image</th>
          <th style={{ border: '1px solid black' }}>Action</th>
        </tr>
        {search(data).map((item, index) => {
          return (
            <tr key={index}>
              <td style={{ border: '1px solid black' }}>{item.login}</td>
              <td style={{ border: '1px solid black' }}>
                <Avatar alt="Remy Sharp" src={item.avatar_url} />
              </td>
              <td style={{ border: '1px solid black' }}>
                <IconButton color="primary" aria-label="add to shopping cart" onClick={() => handleMark(item)}>
                  <BookmarkBorderIcon />
                </IconButton>
              </td>
            </tr>
          );
        })}
      </table>
      <Grid>
        <Pagination count={data.length / 10} page={page} onChange={handleOnChange} />
      </Grid>
    </>
  );
};
export default DataListing;
