import { useState } from 'react';
import UserCard from './UserCard';
import { users } from 'constants/users';
import Tabs from 'components/tabs/Tabs';
import { tabs } from 'constants/tabs';

const Users = () => {
  const user = users[0];
  const [activeTab, setActiveTab] = useState('allUsers');
  return (
    <div className="max-w-7xl px-[5%] shadow-2xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center py-10">Users</h1>
      </div>
      <div className={'grid grid-cols-2 gap-1 border-b border-b-black'}>
        <button
          className={`p-4  ${activeTab === 'allUsers' ? 'bg-black text-white' : 'text-black hover:bg-slate-100'}`}
          onClick={() => setActiveTab('allUsers')}
        >
          All Users
        </button>
        <button
          className={`p-4 ${activeTab === 'bookmarkedUsers' ? 'bg-black text-white' : 'text-black hover:bg-slate-100'}`}
          onClick={() => setActiveTab('bookmarkedUsers')}
        >
          Bookmarked Users
        </button>
      </div>
      <UserCard user={user} />
    </div>
  );
};

export default Users;
