import { createContext, useState } from 'react';

export const MyContext = createContext('');
const GlobalProvider = ({ children }) => {
 const [userData, setUserData] = useState([]);

 return (
  <MyContext.Provider value={{userData, setUserData}}>{children}</MyContext.Provider>
 );
};

export default GlobalProvider;
