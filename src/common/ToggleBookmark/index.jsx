import { useDispatch } from "react-redux"
import { Button } from "antd"
import { ToggleBookmarkAction } from "store/actions/userAction"
import { memo, useCallback } from "react";
const ToggleBookMark = ({ id, bookmark }) => {
    const dispatch = useDispatch();
    const onHandleBookMark = useCallback((userId, bookmark) => {
        dispatch(ToggleBookmarkAction(userId, !bookmark))
    }, [dispatch, ToggleBookmarkAction])

    return (<div><Button onClick={() => onHandleBookMark(id, bookmark)}>{!bookmark ? "BookMarks" : "Un-BookMark"}</Button></div>);
}
export default memo(ToggleBookMark);