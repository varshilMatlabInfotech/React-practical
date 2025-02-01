import { APIURL } from "constants";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Avatar from 'react-avatar';
import Paginate from "common/Pagination";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { addBookmark, deleteBookmark } from "actions/index";
import Form from 'react-bootstrap/Form';
import { useDebouncedCallback } from 'use-debounce';

function Home() {
    const limit = 10;
    const dispatch = useDispatch()
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUserts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const bookmarkedUsers = useSelector(state => state);
    const [searchVal, setSearchVal] = useState("");

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        if (!searchVal) {
            const it = (currentPage - 1) * limit;
            const usrs = allUsers.slice(it, it + limit)
            setUsers(usrs)
        } else {
            const filteredData = searchedUsers.filter(element => {
                return element.login.toLowerCase().includes(searchVal.toLowerCase());
            });
            const it = (currentPage - 1) * limit;
            const usrs = filteredData.slice(it, it + limit)
            setUsers(filteredData)
        }

    }, [currentPage, searchVal])

    const getUsers = async () => {
        const response = await axios.get(APIURL);
        const it = (currentPage - 1) * limit;
        const usrs = response?.data.slice(it, it + limit)
        setUsers(usrs || [])
        setAllUserts(response?.data || [])
        setSearchedUsers(response?.data || [])
    }

    const handleAddBookmark = (user) => {
        const usrObj = {
            id: user?.id,
            title: user?.login,
            url: user?.avatar_url
        }
        dispatch(addBookmark(usrObj))
        const getLocalUsers = localStorage.getItem("bookmarkedUsers")
        if (getLocalUsers) {
            let usrs = JSON.parse(getLocalUsers);
            usrs.push(usrObj)
            localStorage.setItem(
                "bookmarkedUsers",
                JSON.stringify(usrs)
            )
        }
    }

    const handleChange = useDebouncedCallback(
        (e) => {

            setSearchVal(e.target.value)
        },
        1000
    );

    const handleRemoveAll = () => {
        dispatch(deleteBookmark())
        localStorage.setItem("bookmarkedUsers", "[]")
    }

    return (
        <div className="mt-4 container">
            <h1 className="mb-4">Users</h1>
            <div className="d-flex justify-content-between mb-4">
                <Form.Control className="w-25 " type="email" placeholder="Search..." onChange={handleChange} />
                <button className="btn btn-danger" onClick={handleRemoveAll}>Remove All Bookmarked Users</button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Node id</th>
                        <th>User name</th>
                        <th>Bookmark</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((el) => {
                        const bookedUsr = bookmarkedUsers.find(usr => usr.id == el.id)
                        return <tr>
                            <td>{el?.id}</td>
                            <td>{el?.node_id}</td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <Avatar size="100" className="avatar-img border rounded-circle" width={20} facebook-id="invalidfacebookusername" src={el?.avatar_url} />
                                    <p className="ps-3">{el?.login}</p>
                                </div>
                            </td>
                            <td>
                                <button className={`btn ${bookedUsr ? 'btn-warning' : 'btn-primary'}`} onClick={() => handleAddBookmark(el)} disabled={bookedUsr}>
                                    {bookedUsr ? "Bookmarked" : "Add Bookmark"}
                                </button>
                            </td>
                        </tr>
                    })}
                    {!users?.length && <tr>
                        <td colspan="4">No Data Found</td>
                    </tr>}
                </tbody>
            </Table>
            {!searchVal && <Paginate
                postsPerPage={limit}
                totalPosts={allUsers.length}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />}
        </div>
    );
}

export default Home;