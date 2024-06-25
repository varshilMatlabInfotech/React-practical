import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserPage.css';
import { useNavigate,useLocation} from 'react-router-dom';
import ReactPaginate from 'react-paginate';


const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const[check,setCheck]=useState([]);
  const navigate=useNavigate();
  const location=useLocation();
  useEffect(() => {
    axios.get('https://api.github.com/users')
      .then(response => {
        setUsers(response.data);
        console.log(response.data,"=============")
      })
      .catch(err => {
        console.error('Error data:', err);
      });
  }, []);

  const handleSearch = (e) => {
    const searchInput = e.target.value.toLowerCase();
    setSearchTerm(searchInput);

    setTimeout(() => {
      if (searchInput.trim() === '') {
        setSearchResults([]);
      } else {
        const filterOnUser = users.filter(user =>
          user.login.toLowerCase().includes(searchInput)
        );
        setSearchResults(filterOnUser);
      }
    }, 300);
  };
  const handleBookMark=(value)=>{
    console.log(value);
    setCheck(value)
    console.log();
  }

  return (
    <div>
      <div className="user">User Page</div>
      <div className="search-bar">
        <input
          type="text"
          className="search"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="user-listing">
        {searchResults.length > 0 ? (
          searchResults.map(user => (
            <div key={user.id} className="user-details">
              <img src={user.avatar_url} alt="avatar-logo" />
              <h2>{user.login}</h2>
            </div>
          ))
        ) : (
          users.map(user => (
            <div key={user.id} className="user-details">
              <img src={user.avatar_url} alt={`${user.login} avatar`} />
              <h2>{user.login}</h2>
              <button className="book-btn" onClick={()=>handleBookMark(user.id)}>
                Book
                </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserPage;
