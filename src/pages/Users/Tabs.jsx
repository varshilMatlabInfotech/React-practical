import { Tabs } from 'antd';
import List from './List';
import BookmarkList from './BookmarkList';
import { useState } from 'react';
export default ({ users }) => {
  const [newField, setNewField] = useState([]);
  const onChange = (key) => {
    const field = localStorage.getItem('items');
    const initialValue = JSON.parse(field);
    if (initialValue.length) {
      setNewField(initialValue);
    }
  };

  const handleunBookMarked = (user) => {};

  const items = [
    {
      key: '1',
      label: 'Users',
      children: <List userList={users} />,
    },
    {
      key: '2',
      label: 'Bookmarked User',
      children: <BookmarkList bookMarkList={newField} updateBookMarke={(value) => handleunBookMarked(value)} />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};
