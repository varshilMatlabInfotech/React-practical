import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { removeBookmark } from 'slice/bookmarkSlice';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
const BookmarkedPage = () => {
    const [loader, setLoader] = useState(false)
    const [bookmarkData, setBookmarkData] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const { bookmark } = useSelector(state => state)
    const dispatch = useDispatch()

    console.log('bookmark', bookmark)

    useEffect(() => {
        setBookmarkData(bookmark)
    }, [bookmark])

    useEffect(() => {
        searchData()
    }, [searchValue])

    const searchData = () => {
        const getData = bookmark?.filter((item) => item.login.includes(searchValue))
        if (bookmark?.length) {
            setBookmarkData((prev) => getData)
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
                    <Button variant="contained" onClick={() =>
                        dispatch(removeBookmark(row))
                    }><BookmarkRemoveIcon/>Un-Bookmarked</Button>
                </div>
            ),
        },
    ];
    return (
        <div >
            <div className='text-end'>
                <TextField id="filled-basic" label="Search" variant="filled" onChange={(e) => {
                    setLoader(true)
                    setTimeout(() => {
                        setSearchValue(e.target.value)
                    }, 3000);
                }} />
            </div>
            <DataTable columns={columns} data={bookmarkData} pagination perPage={10} progressPending={loader} />
        </div>

    )
}
export default BookmarkedPage;


