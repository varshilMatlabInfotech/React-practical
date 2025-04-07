import React, { useEffect, useRef, useState } from 'react'
import Container from './Container'
import { useUsers } from 'contexts/users/userContext'
import { removeFromBookmark, setUsers } from 'app/slices/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import SearchBox from './SearchBox'

const Bookmarks = () => {
    const {users, bookedmarkUsers} = useSelector((state) => state.users)
    const dispatch = useDispatch()

    const getUsers = async () => {
        try {
            const { data } = await axios.get('https://api.github.com/users')
            dispatch(setUsers(data))
            // setUsers(data)
            // setFilteredUser(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (!!!users.length)
            getUsers()
    }, [users])
    // const { bookmarkList, setFilteredUser, setBookmarkList } = useUsers()
    const timeoutRef = useRef()

    const [currentList, setcurrentList] = useState(bookedmarkUsers)

    useEffect(() => {
        setcurrentList(bookedmarkUsers)
    }, [bookedmarkUsers])

    const handlechange = (e) => {
        if (timeoutRef.current)
            clearTimeout(timeoutRef.current)

        timeoutRef.current = setTimeout(() => {
            if (!!bookedmarkUsers.length && !!e.target.value) {
                const filtered = bookedmarkUsers.filter(item => item?.login?.includes(e.target.value))
                setcurrentList(filtered)
            } else {
                setcurrentList(bookedmarkUsers)
            }
        }, 300)

    }

    return (
        <Container>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl my-10'>Bookmarks</h1>
                {/* <input type="search" className='border rounded-md px-4 py-2' placeholder='Search...' onChange={handlechange} /> */}
                <SearchBox onChange={handlechange} />
            </div>
            <ul className='space-y-3 space'>
                {
                    !!!currentList.length && <>
                        <li>No users</li>
                    </>
                }
                {
                    !!currentList.length && currentList.map((user, index) => {
                        return <li key={user?.id} className='flex items-center gap-2 justify-between bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-md'>
                            <div className='flex items-center gap-2'>
                                <img
                                    alt="user?.login"
                                    src={user?.avatar_url}
                                    className="inline-block w-10 aspect-square rounded-full ring-2 ring-white"
                                />
                                <p>
                                    {user?.login}
                                </p>
                            </div>
                            <button
                                className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
                                type="button"
                                onClick={() => {
                                    dispatch(removeFromBookmark(user))
                                    // setFilteredUser(prev => ([
                                    //     ...prev,
                                    //     user
                                    // ]))
                                    // setBookmarkList(prev => prev.filter(item => item.id !== user.id))
                                }}
                            >
                                Remove
                            </button>
                        </li>
                    })
                }
            </ul>
        </Container>
    )
}

export default Bookmarks