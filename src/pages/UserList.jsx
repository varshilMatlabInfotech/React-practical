import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "redux/usersSlice";



const UsersList = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.users);

}
  useEffect(()=> { 
    dispatch(fetchUsers(0));
 },[dispatch]);

return(
    {filteredUsers.map((user)=>{
        <userCard
         key={user.id}
         user ={user}
    })}
)