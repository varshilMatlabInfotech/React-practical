import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Users from "./components/Users";
import BookmarkedUsers from "./components/BookmarkedUsers";
import store from "./redux/Store";
import "./App.css";
import { Button } from "react-bootstrap";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <nav>
            <NavLink to="/" end><Button className="m-2 p-2 " variant="success">Users</Button></NavLink>
            <NavLink to="/bookmarked"><Button className="m-2 p-2 " variant="success" >Bookmarked Users</Button></NavLink>
          </nav>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/bookmarked" element={<BookmarkedUsers />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;