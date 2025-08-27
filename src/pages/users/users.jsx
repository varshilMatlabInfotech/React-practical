import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from 'slice/userSlice';
import { Avatar } from '@material-ui/core';
import ReactPullToRefresh from 'react-pull-to-refresh';
import { addBookmark } from 'slice/bookmarkSlice';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
const UsersPage = () => {
    const [loader, setLoader] = useState(false)
    const [userData, setUserData] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const { users } = useSelector(state => state)
    const { bookmark } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUser())
    }, [])

    const handleRefresh = () => {
        dispatch(getAllUser())
    }

    useEffect(() => {
        setUserData(users)
    }, [users])

    useEffect(() => {
        searchData()
    }, [searchValue])

    const searchData = () => {
        const getData = users?.filter((item) => item.login.includes(searchValue))
        if (users?.length) {
            setUserData((prev) => getData)
            setLoader(false)
        }
    }



    const columns = [
        {
            name: 'Login User',
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <span><Avatar alt={row.login} src={row.avatar_url} /></span>
                    <span>{row.login}</span>
                </div>
            )
        },
        {
            name: 'User View',
            selector: row => row.user_view_type,
        },
        {
            name: 'User Type',
            selector: row => row.type,
        },
        {
            name: 'Action',
            cell: row => (
                <div>
                    <Button variant="contained" disabled={bookmark?.find((item) => item?.id === row?.id)} onClick={() =>
                        dispatch(addBookmark(row))
                    }><BookmarkAddIcon/>Bookmarked</Button>
                </div>
            ),
        },
    ];
    return (
        <ReactPullToRefresh onRefresh={handleRefresh} className="your-own-class-if-you-want" style={{ textAlign: 'center' }}>
            <div className='text-end'>
                <TextField id="filled-basic" label="Search" variant="filled" onChange={(e) => {
                    setLoader(true)
                    setTimeout(() => {
                        setSearchValue(e.target.value)
                    }, 3000);
                }} />
            </div>
            <DataTable columns={columns} data={userData} pagination perPage={10} progressPending={loader} />
        </ReactPullToRefresh>
    )
};
export default UsersPage;
