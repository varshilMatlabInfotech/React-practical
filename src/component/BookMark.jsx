import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

import Grid from '@mui/material/Grid';

const BookMark = () => {
  const bookMark = useSelector((state) => state.bookMark.bookMark);
  console.log('bookMark', bookMark);

  return (
    <>
      {bookMark.map((data) => {
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader avatar={<Avatar alt="Remy Sharp" src={data.avatar_url} />} title={data.login} />
                </Card>
              </Grid>
            </Grid>
          </>
        );
      })}
    </>
  );
};
export default BookMark;
