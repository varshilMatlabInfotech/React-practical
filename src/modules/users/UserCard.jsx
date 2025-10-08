import React, { useState } from 'react';

const UserCard = ({ user }) => {
  const [isChecked, setIsChecked] = useState(user?.isBookmarked);
  return (
    <div className="border border-red flex items-center justify-between gap-6 shadow-lg p-6">
      <div className="flex items-center gap-6">
        <img src={user?.avatar_url} className={'h-10 w-10 aspect-square rounded-full'} />
        <p>{user?.login}</p>
      </div>
      <div className={`flex items-center justify-center border border-black rounded-xl ${isChecked ? 'bg-black text-white' : 'bg-white'} p-2 w-28`}>
        <input
          type="checkbox"
          id={user?.id}
          className="hidden"
          onChange={(e) => {
            console.log(e.target.checked);
            setIsChecked(e.target.checked);
          }}
        />
        <label for={user?.id} className="text-center ">
          {isChecked ? 'Bookmarked' : 'Bookmark'}
        </label>
      </div>
    </div>
  );
};

export default UserCard;
