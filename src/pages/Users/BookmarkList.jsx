import { useEffect, useState } from 'react';
import { Table, Avatar, Input, Button } from 'antd';

export default ({ bookMarkList, updateBookMarke }) => {
  const columns = [
    {
      title: 'Avtar',
      dataIndex: 'image',
      render: (record) => <Avatar src={<img src={record} alt="avatar" />} />,
      responsive: ['md'],
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      responsive: ['md'],
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <Button size="small" onClick={() => updateBookMarke(record)}>
            UnBookMark
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={bookMarkList} rowKey="id" loading={bookMarkList.length ? false : true} />
    </div>
  );
};
