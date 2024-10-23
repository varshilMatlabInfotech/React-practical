import DataTable from 'react-data-table-component';

const SeriesList = () => {
 
  const getUsers = JSON.parse(localStorage.getItem("users"))
  const columns = [
    {
      name: 'ID',
      sortable: true,
      cell: (row) => <div style={{ fontWeight: 700 }}>{row?.id}</div>,
    },
    {
      name: 'Title',
      sortable: true,
      cell: (row) => <div style={{ fontWeight: 700 }}>{row.login}</div>,
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
  ];
  return (
    <>
      <DataTable title="Bookmark Users" columns={columns} data={getUsers} pagination/>
    </>
  );
};
export default SeriesList;
