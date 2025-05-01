import { useSelector } from "react-redux";
import UserTable from "../components/UserTable";

function BookMarked() {
  const users = useSelector((state) => state.auth.bookmarkedUsers);

  return (
    <UserTable
      users={users}
      searchEnabled={true}
      title={"Bookmarked Users"}
    />
  );
}

export default BookMarked;
