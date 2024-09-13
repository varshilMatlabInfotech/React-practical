import React, { memo, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import AvatarImg from "common/AvatarImg/index";
import ToggleBookMark from "common/ToggleBookmark/index";
import Search from "common/Search/Search";
function UserList() {
    const { loading, user } = useSelector((state) => state.user)
    const [searchText, setSearchText] = useState("")
    const modifyUser = useMemo(() => user.filter((item) => searchText ? item.login?.includes(searchText) : item, [user, searchText]))
    if (loading) {
        return <div>Loading...</div>
    }
    const onHandleSearch = (event) => {

        //try using debounce method but unable to found function.. 
        // debounce(() => { setSearchText(event.target.value) })
        setSearchText(event.target.value)
    }

    return (<div className="bg-blue-300">
        <Search searchText={searchText} onHandleSearch={onHandleSearch} />
        {modifyUser.length == 0 ?
            <div className="no-user-found-wrap"> No User Information</div>
            : <div>
                <table className="table border-red-50" border={2}>
                    <thead>
                        <th>User Name</th>
                        <th>User Avatar</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {modifyUser.map((item, index) => {
                            return <tr key={`user-key-${index}`}>
                                <td><div className="user-name-wrap">{item.login}</div></td>
                                <td><AvatarImg imgUrl={item.avatar_url} /></td>
                                <td><ToggleBookMark id={item.id} bookmark={item.bookmark} /></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>}
    </div>);
}
export default memo(UserList);