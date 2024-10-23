import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from 'Component/Home/index';
import Bookmark from 'Component/Bookmark/index';
import Navbar from 'Component/Layout/Navbar/index';
function App() {
  return (
    <div>

      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/bookmark" element={<Bookmark/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
