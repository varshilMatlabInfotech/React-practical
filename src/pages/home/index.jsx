import { useCallback, useEffect, useState } from 'react';
import { getUsers } from 'services/services';
import { Avatar, Card, Col, Row, Checkbox } from 'antd';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
const { Meta } = Card;
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { BsSearch } from 'react-icons/bs';
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

const Home = () => {
  const [userList, setUserList] = useState([])
  const [currentPage, setCurrentPage] = useState(5);
  const totalPages = userList?.length;
  const [searchVal, setSearchVal] = useState("");
  console.log("userList", userList)

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
      localStorage.setItem("bookmarkList", JSON.stringify(currentItem));
    }
  },[]);

  const loadData = useCallback(async () => {
    try{
        const usersArray = await getUsers();
        if(usersArray?.length > 0){
          setUserList(usersArray);
        }
    }  catch(error){
        console.log("error", error)
    }
},[])

    useEffect(() => {
      loadData();
    },[loadData])

    const onSearch = () => {
      if (searchVal === "") { setUserList(userList); { return loadData();} }
      const filterBySearch = userList.filter((item) => {
          if (item?.firstName.toLowerCase()
              .includes(searchVal.toLowerCase())) { return item; }
      })
      setUserList(filterBySearch);
  }

  return (
    <>
<input onChange={e => setSearchVal(e.target.value)}>
                </input>
                <BsSearch onClick={onSearch} />
<Row gutter={16}>
    <Col span={3}>
    {
    userList?.length > 0 && userList?.map((item, index) => {
    return <div  key={index} >

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
<Checkbox onChange={(e) => onChange(e, item)}>Checkbox</Checkbox>
  <Meta
    avatar={<Avatar src={item?.image} />}
    title={item?.firstName}
  />
</Card>
</div>
})

}
</Col>

</Row>
    <ResponsivePagination
      current={currentPage}
      total={10}
      onPageChange={setCurrentPage}
    />
    </>
  );
};

export default Home;
