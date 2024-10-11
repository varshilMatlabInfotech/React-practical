import Usertable from 'components/UserTabel/Usertable';
import { useSelector } from 'react-redux';

function Users(props) {
  const users = useSelector((state) => state.user.users);
  const searchdText = useSelector((state) => state.user.searchdText);
  console.log('users', users);

  return (
    <div>
      <Usertable data={searchdText ? users.filter(item=>item.login == searchdText) : users} />
    </div>
  );
}

export default Users;
