import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
const PageHeader = () => {
    const navigate=useNavigate()
    const [activeTab, setActiveTab] = useState(0)
    const tabList = [
        { key: 0, title: "Users",url:"/user" },
        { key: 1, title: "Bookmarked Users",url:"/book-mark"}]
    
        useEffect(()=>{
            onHandleTabChange(0,"/user");
        },[])
        const onHandleTabChange=useCallback((key,url)=>{
            navigate(url)
            setActiveTab(key)
        },[navigate])

    return (<div className="navbar-header flex gap-12 p-10 bg-blue-500 text-white justify-between">
        <div className="navbar-logo">Logo</div>
        <div className="flex gap-5">{tabList.map((tab) => <div className={`cursor-pointer ${activeTab==tab.key ?"bg-red-400":""}`} onClick={()=>onHandleTabChange(tab.key,tab.url)}>{tab.title}</div>)}</div>
    </div >)
}
export default PageHeader