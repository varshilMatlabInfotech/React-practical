import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/features/userSlice";
import UserTable from "../components/UserTable";

function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <UserTable
      users={users}
      pagination={true}
      searchEnabled={true}
      title={"Users"}
    />
  );
}

export default Home;
