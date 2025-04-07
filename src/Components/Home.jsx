import React, { useEffect, useRef, useState } from 'react'
import Container from './Container'
import { useUsers } from 'contexts/users/userContext'
import { useSelector, useDispatch } from 'react-redux'
import { addToBookmark, fetchUsers, setUsers } from 'app/slices/userSlice'
import axios from 'axios';
import ReactPaginate from 'react-paginate'
import SearchBox from './SearchBox'

const Home = () => {
  const itemsPerPage = 5
  const {users} = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const [itemOffset, setItemOffset] = useState(0);
  const [currentList, setcurrentList] = useState([])

  const endOffset = itemOffset + itemsPerPage;
  // const currentItems = users.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(users.length / itemsPerPage);

  useEffect(() => {
    setcurrentList(users.slice(itemOffset, endOffset))
  },[itemOffset, endOffset, users])

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

  // useEffect(() => {
  //   if (!!!users.length)
  //     dispatch(fetchUsers())
  // }, [users])

  // const { filteredUser, setFilteredUser, setBookmarkList } = useUsers()
  const timeoutRef = useRef()



  // useEffect(() => {
  //   setcurrentList(users)
  // }, [users])

  const handlechange = (e) => {
    if (timeoutRef.current)
      clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      if (!!users.length && !!e.target.value) {
        const filtered = users.filter(item => item?.login?.includes(e.target.value))
        setcurrentList(filtered)
      } else {
        setcurrentList(users.slice(itemOffset, endOffset) || [] )
      }
    }, 300)
  } 
  
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    setItemOffset(newOffset);
  };
  
  return (
    <Container>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl my-10'>Home</h1>
        {/* <input type="search" className='border border-black rounded-md px-4 py-2' placeholder='Search...' onChange={handlechange} /> */}
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
                className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                type="button"
                onClick={() => {
                  dispatch(addToBookmark(user))
                  // setBookmarkList(prev => ([
                  //   ...prev,
                  //   user
                  // ]))
                  // setFilteredUser(prev => prev.filter(item => item.id !== user.id))
                }}
              >
                Bookmark
              </button>
            </li>
          })
        }
      </ul>

 
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={itemsPerPage}
        pageCount={users.length / itemsPerPage}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className='flex items-center gap-4 justify-center py-3 pagination'
        activeLinkClassName="active-page"
      />
    </Container>
  )
}

export default Home