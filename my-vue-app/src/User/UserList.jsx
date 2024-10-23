import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, setUsers, setUsersBookMark } from '../Slice/UserSlice';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.user);
  const [search, setSearch] = useState('');
  const { userBookMark } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const navigate = useNavigate();
  const columns = [
    {
      name: 'ID',
      sortable: true,
      cell: (row) => <div style={{ fontWeight: 700 }}>{row?.id}</div>,
    },
    {
      name: 'Title',
      sortable: true,
      cell: (row) => <div style={{ fontWeight: 700 }}>{row?.login}</div>,
    },
    {
      name: 'Image',
      sortable: true,
      cell: (row) => {
        return <img src={row?.avatar_url} height={30} width={30} />;
      },
    },
    {
      name: 'Node Id',
      sortable: true,
      cell: (row) => <div style={{ fontWeight: 700 }}>{row?.node_id}</div>,
    },
    {
      name: 'Type',
      sortable: true,
      cell: (row) => <div style={{ fontWeight: 700 }}>{row?.type}</div>,
    },
    {
      name: 'Action',
      sortable: true,
      cell: (row) => {
        return (
          <button
            onClick={() => {
              localStorage.setItem('users', JSON.stringify([...userBookMark, row])) || [];
              dispatch(setUsersBookMark([...userBookMark, row]));
              navigate('/series');
              dispatch(setUsers(row));
            }}
          >
            Bookmark
          </button>
        );
      },
    },
  ];
  return (
    <>
      {/* <DataTable data={usersData?.usersData} columns={columnsTable} /> */}
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <DataTable title="Users List" columns={columns} data={usersData?.usersData} pagination />

      {/* <CSmartTable */}
    </>
  );
};
export default UserList;
