import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UserList from './User/UserList';
import Navbar from './Navbar';
import SeriesList from './User/SeriesList';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/series" element={<SeriesList />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
