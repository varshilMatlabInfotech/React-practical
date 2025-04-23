import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Nav, Tab, Container } from 'react-bootstrap';
import UsersView from './views/UsersView/UsersView';
import BookmarksView from './views/BookmarksView/BookmarksView';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {

  return (
    <>
      <Provider store={store}>
        <Container fluid className="py-2 py-md-3 px-0">
          <Tab.Container defaultActiveKey="users">
            <Nav variant="tabs" className="px-2 px-md-3 mb-3">
              <Nav.Item>
                <Nav.Link eventKey="users" className="px-2 px-md-3">Users</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="bookmarks" className="px-2 px-md-3">Bookmarks</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="px-0">
              <Tab.Pane eventKey="users">
                <UsersView />
              </Tab.Pane>
              <Tab.Pane eventKey="bookmarks">
                <BookmarksView />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </Provider>

    </>
  )
}

export default App
