import { useCallback, useEffect, useState } from 'react';
import { Avatar, Card, Col, Row, Checkbox } from 'antd';
import 'react-responsive-pagination/themes/classic.css';
const { Meta } = Card;

const BookMark = () => {

  const [userList, setUserList] = useState([])
  console.log("userList", userList)     
  const [currentPage, setCurrentPage] = useState(8)

const loadData = useCallback(async () => {
    try{
        const usersArray = JSON.parse(localStorage.getItem("bookmarkList"))
        console.log("====usersArray", usersArray)
        setUserList(usersArray)
    }  catch(error){
        console.log("error", error)
    }
},[])

const toggleBookmark = (user) => {
  let updatedBookmarks = [...bookmarkedUsers];
  const isBookmarked = bookmarkedUsers.find((u) => u.id === user.id);

  if (isBookmarked) {
    updatedBookmarks = updatedBookmarks.filter((u) => u.id !== user.id);
  } else {
    updatedBookmarks.push(user);
  }

  setBookmarkedUsers(updatedBookmarks);
  localStorage.setItem('bookmarkList', JSON.stringify(updatedBookmarks));
};

    useEffect(() => {
        loadData();
    },[loadData])

    const onChange = useCallback((e, item) => {
      const localList = JSON.parse(localStorage.getItem("bookmarkList"))
      console.log('localList', localList)
      if(e.target.checked === true){
        if(localList?.length <= 0 || localList === null){
          localStorage.setItem("bookmarkList", JSON.stringify([item]));
      
        } else  if (localList?.length > 0){
          console.log('localList=-=-=-=-=-', localList)
          localStorage.setItem("bookmarkList", JSON.stringify([...localList, item]));
        }
      } else {
        const removeItem = localList?.find((a) => a?.id == item?.id)
  
        const findIndex = localList.findIndex(a => a.id === removeItem.id)
  
        findIndex !== -1 && localList.splice(findIndex , 1)
        const currentItem = localList?.splice(localList)
        console.log("currentItem-----__>", currentItem)
        localStorage.setItem("bookmarkList", JSON.stringify([currentItem]));
      }
    },[]);  

  return (
    <>
    {
    userList?.length > 0 && userList?.map((item, index) => {
    return <div  key={index}>

<Row  gutter={16}>
    <Col span={3}>
    <Card
  style={{
    width: 300,
  }}
  cover={
    <img
      alt="example"
      src={item?.image}
    />
  }
>
<Checkbox checked onChange={(e) => onChange(e, item)}>Checkbox</Checkbox>
  <Meta
    avatar={<Avatar src={item?.image} />}
    title={item?.login}
  />
</Card>
    </Col>
    
  </Row>
</div>
})
    }
    </>
  );
};

export default BookMark;
