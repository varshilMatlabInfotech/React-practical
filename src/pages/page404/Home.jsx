import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './index.css';
import '../../utils/store/index';
import Pagination from './Pagination';

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const indexOfLastTodo = currentPage * postsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - postsPerPage;
  const currentTodos = userData.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderTodos = currentTodos.map((data, index) => {
    return (
      <tr>
        <th>{data.login}</th>
        <th>
          <img className="img-style" src={data.avatar_url} />
        </th>
        <th>
          <button type="button" class="btn btn-primary" onClick={() => handleBook(data?.login)}>
            Primary
          </button>
        </th>
      </tr>
    );
  });

  useEffect(() => {
    axios.get('https://api.github.com/users').then((data) => setUserData(data?.data));
  }, []);

  const handleChange = (e) => {
    setSearchData(e.target.value);
    const filterData = userData.filter((data) => {
      return Object.values(data.login).join('').toLowerCase().includes(searchData.toLowerCase());
    });
    setUserData(filterData);
  };

  const handleBook = (name, url) => {
    let dataLink = url;

    if (!url.includes('http')) {
      url = '//' + url;
    }
    let item = `<div class="bookmark">
                     <span>${name}</span>
                     <a class="visit" href="${url}" target="_blank" 
                        data-link='${dataLink}'>Visit</a>
                     <a onclick="removeBookmark(this)" 
                        class="delete" href="#">delete</a>
                    </div>`;
    bookmarksSection.innerHTML += item;
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <div className="search-style">
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Search" onChange={handleChange} />
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>{renderTodos}</tbody>
      </table>
      <Pagination length={userData?.length} postsPerPage={postsPerPage} handlePagination={handlePagination} currentPage={currentPage} />
    </div>
  );
};

export default Home;
