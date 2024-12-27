import { useEffect, useState } from 'react';
import axios from 'axios';
import List from './List';
import Tabs from './Tabs';
export default () => {
  const [user, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('error', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return <div className="container mx-auto px-4">{<Tabs users={user} />}</div>;
};
