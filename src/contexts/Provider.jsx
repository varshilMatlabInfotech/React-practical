import { useEffect, useState } from 'react';
import { MyContext } from './index';

export const MyContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [bookMarkData, setBookMarkData] = useState([]);

  return <MyContext.Provider value={{ data, setData, bookMarkData, setBookMarkData }}>{children}</MyContext.Provider>;
};
