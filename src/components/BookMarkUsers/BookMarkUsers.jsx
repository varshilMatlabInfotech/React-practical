import { DataGrid } from '@mui/x-data-grid';
import SearchUsers from 'components/SearchUsers/index';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBookmarkUsers, getBookmarkUsers } from 'redux/actions/userActions';

const BookMarkUsers = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const bookMarkUsers = useSelector((state) => state.users.bookMarksUsers);
  const dispatch = useDispatch();
  const filteredData = bookMarkUsers?.filter((value) => value.username?.includes(search.toLowerCase()));

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
    const data = filteredData.filter((value) => !ids.includes(value.id));
    dispatch(addBookmarkUsers(data));
  };

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div>
      <SearchUsers search={search} setSearch={setSearch} />
      <div>
        <button onClick={handleRedirect}>Go Back</button>
      </div>
      <div>
        <DataGrid rows={filteredData} columns={columns} checkboxSelection onRowSelectionModelChange={(ids) => handleSelectedData(ids)} />
      </div>
    </div>
  );
};
export default BookMarkUsers;
