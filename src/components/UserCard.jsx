import React, { useEffect, useState } from 'react';

function UserCard({ avtar_url, login, bookmarked, ele }) {
  const [bookmark, setBookmark] = useState(bookmarked?bookmarked?.bookmark:false);
  const [storeBookMark, setStorebookmark]=useState([])
 
  const handleBookmark = () => {
    setBookmark(!bookmark);
    
    const data = [...storeBookMark]
    const exists = data.find((e) => e.id == ele.id);
    
    if (!exists) {
        console.log('inside not')
        let obj ={ ...ele, bookmark: !bookmark }
      data.push(obj);
      console.log(data, '----book')
      localStorage.setItem('bookmark_page', JSON.stringify(data));
    } else {
      data = data?.map((el) => {
        if (ele.id == el.id) {
          return {
            ...el,
            bookmark: !bookmark,
          };
        } else {
          return el;
        }
      });
      setStorebookmark(data)
      localStorage.setItem('bookmark_page', JSON.stringify(data));
    }

    
  };
useEffect(()=>{
    const storeBookMark = JSON.parse(localStorage.getItem('bookmark_page')) || [];
    setStorebookmark(storeBookMark)
},[storeBookMark])
  return (
    <div style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
      <img style={{ width: '100%', height: '80%' }} src={avtar_url} />
      <div style={{ display: 'flex' }}>
        <h2>{login}</h2>
        {!bookmark ? (
          <img onClick={handleBookmark} style={{ width: '25px', height: '25px' }} src="https://cdn-icons-png.flaticon.com/512/494/494568.png" />
        ) : (
          <img onClick={handleBookmark} style={{ width: '25px', height: '25px' }} src="https://cdn-icons-png.flaticon.com/512/786/786352.png" />
        )}
      </div>
    </div>
  );
}

export default UserCard;

// box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
