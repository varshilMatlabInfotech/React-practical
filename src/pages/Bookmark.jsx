import { APIURL } from "constants";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Avatar from 'react-avatar';
import Paginate from "common/Pagination";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { addBookmark } from "actions/index";
import Form from 'react-bootstrap/Form';
import { useDebouncedCallback } from 'use-debounce';

function Bookmark() {
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const bookmarkedUsers = useSelector(state => state);

    useEffect(() => {
        setUsers(bookmarkedUsers)
        setAllUsers(bookmarkedUsers)
    }, [bookmarkedUsers])

    const handleChange = useDebouncedCallback(
        (e) => {
            const filteredData = allUsers.filter(element => {
                return element.title.toLowerCase().includes(e.target.value.toLowerCase());
            });
            setUsers(filteredData)
        },
        1000
    );

    return (
        <div className="mt-4 container">
            <h1 className="mb-4">Bookmarked Users</h1>
            <Form.Control className="w-25 mb-4" type="email" placeholder="Search..." onChange={handleChange} />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Avatar</th>
                        <th>User name</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((el) => {
                        return <tr>
                            <td>{el?.id}</td>
                            <td>
                                <Avatar size="100" className="avatar-img border rounded-circle" width={20} facebook-id="invalidfacebookusername" src={el?.url} />
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <p className="ps-3">{el?.title}</p>
                                </div>
                            </td>
                        </tr>
                    })}
                    {!users?.length && <tr>
                        <td colspan="3">No Data Found</td>
                    </tr>}
                </tbody>
            </Table>
        </div>
    );
}

export default Bookmark;