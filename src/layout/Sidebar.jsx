import { useNavigate } from '../../node_modules/react-router-dom/dist/index';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <>
      <ul>
        <li onClick={() => navigate('/')}>Users</li>
        <li onClick={() => navigate('/bookmarks')}>Bookmarks</li>
      </ul>
    </>
  );
};

export default Sidebar;
