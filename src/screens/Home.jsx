import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import axios from 'axios';
import BookMark from 'common/component/BookMark';
import Users from 'common/component/Users';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from 'reducers/userReducer';

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user?.data);
  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => setValue(newValue);

  useEffect(() => {
    if (!Array.isArray(data) || data?.length === 0) {
      axios
        .get('https://api.github.com/users')
        .then((res) => {
          if (Array.isArray(res?.data) && res?.data?.length > 0) {
            dispatch(setData(res.data.map((el) => ({ ...el, isBookmarked: false }))));
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-2 shadow">
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="w-screen md:max-w-[80vw] mx-auto">
          <Tab value="one" label="User" />
          <Tab value="two" label="Bookmark" />
        </Tabs>
      </div>
      <div>
        {value === 'one' && <Users />}
        {value === 'two' && <BookMark />}
      </div>
    </div>
  );
};

export default Home;
