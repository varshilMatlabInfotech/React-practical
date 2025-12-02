import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddRemoveBookMark } from 'reducers/userReducer';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';

const Users = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user?.data);
  const [searchVal, setSearchVal] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [listingData, setlistingData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (searchData && page >= 0) {
      setlistingData(searchData?.slice(page * 10, page * 10 + 10));
    }
  }, [page, searchData]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setPage(0);
      const updatedData = data.filter((el) => el?.login?.toLowerCase()?.includes(searchVal?.toLowerCase()));
      setSearchData(updatedData);
      setlistingData(updatedData?.slice(0, 10));
    }, 300);

    return () => {
      clearTimeout(timeOut);
    };
  }, [data, searchVal]);

  return (
    <div className="flex justify-center p-4">
      <div className="w-screen md:max-w-[80vw] flex flex-col gap-4">
        {listingData?.length > 0 ? (
          <>
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e) => setSearchVal(e.target.value)} />

            {listingData?.map((item, index) => (
              <div className="w-full shadow p-4 rounded-xl border flex items-center justify-between gap-6 flex-wrap" key={index}>
                <div className="flex items-center gap-4">
                  <img src={item?.avatar_url} className="w-10 h-10 rounded-full" />
                  <div>{item?.login}</div>
                </div>

                {!item.isBookmarked && (
                  <Button
                    variant="outlined"
                    className="ml-auto mr-0 capitalize"
                    onClick={() => dispatch(handleAddRemoveBookMark({ id: item.id, isBookmarked: true }))}
                  >
                    Bookmark
                  </Button>
                )}
              </div>
            ))}
          </>
        ) : (
          <p className="flex items-center justify-center text-gray-400">No Data</p>
        )}
        <div className="flex items-center justify-center ">
          <Pagination page={page + 1} count={Math.ceil(searchData.length / 10)} onChange={(e, page) => setPage(page - 1)} />
        </div>
      </div>
    </div>
  );
};

export default Users;
