import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const UserContext = createContext()


export const useUsers = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUsers can be access only inside UserProvider')
    }
    return context
}


export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [filteredUser, setFilteredUser] = useState([])
    const [bookmarkList, setBookmarkList] = useState([])

    // const getUsers = async () => {
    //     try {
    //         const { data } = await axios.get('https://api.github.com/users')
    //         setUsers(data)
    //         setFilteredUser(data)
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    // useEffect(() => {
    //     getUsers()
    // }, [])

    return <UserContext.Provider value={{ users, setUsers, filteredUser, setFilteredUser, bookmarkList, setBookmarkList }}>
        {children}
    </UserContext.Provider>
}
