import axios from 'axios';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmarkUsers, getUsers } from 'redux/actions/userActions';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import SearchUsers from 'components/SearchUsers/index';

const UserList = () => {
  const navigate = useNavigate();
  const userLists = useSelector((state) => state.users.items.users);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://dummyjson.com/users');
      dispatch(getUsers(res.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredData = userLists?.filter((value) => value.username?.includes(search.toLowerCase()));

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
    },
    ,
    {
      headerName: 'Photo',
      renderCell: (param) => {
        return (
          <>
            <img src={param.row.image} alt={param.username} width={20} height={20} />
          </>
        );
      },
    },
    {
      field: 'username',
      headerName: 'Username',
    },
    {
      field: 'role',
      headerName: 'Role',
    },
    {
      field: 'gender',
      headerName: 'Gender',
    },
    {
      field: 'age',
      headerName: 'Age',
    },
  ];

  const handleSelectedData = (ids) => {
    const data = ids.map((id) => filteredData.find((row) => row.id === id));
    dispatch(addBookmarkUsers(data));
  };

  const handleNavigate = () => {
    navigate('/bookmarkusers');
  };

  return (
    <div>
      <SearchUsers search={search} setSearch={setSearch} />
      <div>
        <button onClick={handleNavigate}>BookMarks Users</button>
      </div>
      <DataGrid
        rows={filteredData}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(ids) => handleSelectedData(ids)}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
      />
    </div>
  );
};

export default UserList;
