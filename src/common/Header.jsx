import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBookmark } from 'actions/index';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (path) =>{
        navigate(path);
    }

    useEffect(() => {
        const getLocalUsers = localStorage.getItem("bookmarkedUsers")
        if(!getLocalUsers) {
            localStorage.setItem("bookmarkedUsers", "[]")
        }
        if (getLocalUsers) {
            let usrs = JSON.parse(getLocalUsers);
            for (const usr of usrs) {
                dispatch(addBookmark(usr))
            }
        }
    }, [])

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleNavigate('/')}>Users</Nav.Link>
            <Nav.Link onClick={() => handleNavigate('/bookmark')}>Bookmark</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;