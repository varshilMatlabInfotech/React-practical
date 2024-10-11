import Usertable from 'components/UserTabel/Usertable';
import { useSelector } from 'react-redux';

function Bookedmark() {
  const users = useSelector((state) => state.user.users);

  return (
    <div>
      <Usertable data={users?.length ? users.filter((item) => item?.is_bookMarked) : []} />
    </div>
  );
}

export default Bookedmark;
