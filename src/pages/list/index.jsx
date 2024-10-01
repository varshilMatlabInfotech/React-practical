import React, { useContext, useEffect, useState } from 'react';
import UserList from './UserList';
import BookMarkList from './BookMarkList';
import { MyContext } from 'contexts/index';

function User() {
  return (
    <div className="flex gap-2">
      <UserList />
      <BookMarkList />
    </div>
  );
}

export default User;
