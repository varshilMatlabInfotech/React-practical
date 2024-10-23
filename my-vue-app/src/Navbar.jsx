import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div className="navbarContainer">
        <div className="navbarList">
          <Link to="/" className='navbarName'>Users</Link>
          <Link to="series" className='navbarName'>Series</Link>
        </div>
      </div>
    </>
  );
};
export default Navbar;
