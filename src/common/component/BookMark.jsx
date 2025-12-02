import Button from '@mui/material/Button';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddRemoveBookMark } from 'reducers/userReducer';
import TextField from '@mui/material/TextField';

const BookMark = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user?.data);
  const [searchVal, setSearchVal] = useState('');
  const [bookMarkedData, setBookMarkedData] = useState('');

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setBookMarkedData(data.filter((el) => el?.isBookmarked && el?.login?.toLowerCase()?.includes(searchVal?.toLowerCase())));
    }, 300);

    return () => {
      clearTimeout(timeOut);
    };
  }, [searchVal]);

  useEffect(() => {
    setBookMarkedData(data.filter((el) => el?.isBookmarked));
  }, [data]);

  return (
    <div className="flex justify-center p-4">
      <div className="w-screen md:max-w-[80vw] flex flex-col gap-4">
        {bookMarkedData?.length > 0 ? (
          <>
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e) => setSearchVal(e.target.value)} />
            {bookMarkedData.map((item, index) => (
              <div className="w-full shadow p-4 rounded-xl border flex items-center justify-between gap-6 flex-wrap" key={index}>
                <div className="flex items-center gap-4">
                  <img src={item?.avatar_url} className="w-10 h-10 rounded-full" />
                  <div>{item?.login}</div>
                </div>

                <Button
                  variant="outlined"
                  className="ml-auto mr-0"
                  onClick={() => dispatch(handleAddRemoveBookMark({ id: item?.id, isBookmarked: false }))}
                >
                  Remove Bookmark
                </Button>
              </div>
            ))}
          </>
        ) : (
          <p className="flex items-center justify-center text-gray-400">No Data</p>
        )}
      </div>
    </div>
  );
};

export default BookMark;
