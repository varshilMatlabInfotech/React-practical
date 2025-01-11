import React, { useState, useEffect, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useDebounce } from 'use-debounce';

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable({ rows, columns }) {
  console.log('neeeeeeee', rows);
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useState('');
  const [value] = useDebounce(searchParams, 300);

  useEffect(() => {
    setData(rows);
  }, [rows]);

  useEffect(() => {
    const onSearch = () => {
      let searchArray = rows?.filter((item) => item?.login.toLowerCase().includes(value.toLowerCase()));
      setData(searchArray);
    };

    if (value?.length) {
      onSearch();
    } else {
      setData(rows);
    }
  }, [value]);

  return useMemo(() => {
    return (
      <Paper sx={{ height: 650, width: '100%' }}>
        <TextField
          label="Search"
          variant="outlined"
          sx={{ margin: 2 }}
          onChange={(e) => {
            setSearchParams(e.target.value);
          }}
        />

        <DataGrid
          rows={data}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20, 30]}
          sx={{ border: 0 }}
        />
      </Paper>
    );
  }, [data, columns]);
}
