import { useMemo } from "react";
import { Flex, Card } from "antd"
import AvatarImg from "common/AvatarImg/index";
import ToggleBookMark from "common/ToggleBookmark/index";
import { useSelector } from "react-redux";
const BookMark = () => {
    const { user } = useSelector((state) => state.user);
    const bookMarkUser = useMemo(() => user.filter((item) => item.bookmark), [user])
    return <div className="book-mark-wrapper">
        {bookMarkUser.length == 0 ? <NoBookMarkFound /> : <>
            <Flex>
                <h2 className="font-extrabold flex justify-center"> bookmarked users</h2>
            </Flex>
            <Flex>
                <Flex>
                    {bookMarkUser?.map((item, index) => {
                        return (<Card className="bg-blue-500 font-bold text-white border-gray-200 align-middle" key={index}>
                            <h1>{item?.login}</h1>
                            <AvatarImg imgUrl={item.avatar_url} />
                            <ToggleBookMark id={item.id} bookmark={item.bookmark} />
                        </Card>)
                    })}
                </Flex>
            </Flex></>}
    </div>
}
export default BookMark;

const NoBookMarkFound = () => {
    return <div className="flex justify-center mx-auto"><h3>No Book Mark Found</h3></div>
}