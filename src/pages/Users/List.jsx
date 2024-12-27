import { useEffect, useMemo, useState } from 'react';
import { Table, Avatar, Input, Button } from 'antd';
import debouce from 'lodash.debounce';

export default ({ userList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  let listToDisplay = userList;

  const handleBookmarked = (user) => {
    if (items.find((item) => item.id === user.id)) {
      alert('User has been already bookmarked');
    } else {
      console.log(user, 'in second condition');
      setItems((prevArray) => [...prevArray, user]);
      alert('User has been successfully bookmarked!!');
    }
  };

  useEffect(() => {
    console.log(items, 'items added');
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const columns = [
    {
      title: 'Avtar',
      dataIndex: 'image',
      render: (record) => <Avatar src={<img src={record} alt="avatar" />} />,
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <Button size="small" onClick={() => handleBookmarked(record)}>
            BookMark
          </Button>
        );
      },
    },
  ];
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const renderFruitList = () => {
    return listToDisplay;
  };

  if (searchTerm !== '') {
    listToDisplay = userList.filter((ul) => {
      if (ul.firstName === searchTerm) {
        return [ul];
      }
      return null;
    });
  }

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  return (
    <div>
      <Input placeholder="Search..." onChange={debouncedResults} />
      <Table columns={columns} dataSource={renderFruitList()} rowKey="id" loading={userList.length ? false : true} />
    </div>
  );
};
