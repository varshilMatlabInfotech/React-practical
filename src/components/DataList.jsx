import  {  useEffect, useState } from 'react'
import getData from 'utils/getData'

const DataList = () => {
    const [allData , setAllData] = useState([])
    const [bookMart , setBookMart] = useState([])
    const [data , setData] = useState([])
    const [defaultData , setDefaultData] = useState("defaultlist")
    const [users , setUsers] = useState("")

    const [bookMartSearch , setBookMartSearch] = useState("")
       useEffect (() => {
            const fetchData = async() => {
                const data = await getData()
                setAllData(data)
            }
          fetchData()
       } ,[])
       
       if(!allData){
           <div>Loading...</div>
       }

     useEffect(() => {
         const filterData = allData.filter((item) => item.login.includes(users))
         setData(filterData)
     } ,[allData , users])

    const handleBookMartData = (item) => {
        const {id} = item
        setBookMart((prev) => [...prev , item])
        const finalData = data.filter((item) => item.id !==id)
        setData(finalData)
    }

    const handleRemoveFromBookMart = (item) => {
        const { id} = item
        const bookMartFinalData = bookMart.filter((item) => item.id !== id)
        setBookMart(bookMartFinalData)
        setData((prev) => [item , ...prev])
    }
   const finalBookMartData = bookMart.filter((item) => item.login.includes(bookMartSearch))
 
    return (
        <>
            <div className="flex flex-row p-4">
             <button onClick={() => setDefaultData("defaultlist")} className=' border-2 border-gray-400 border-r-0'>DataList</button>
             <button onClick={() => setDefaultData("bookMartlist")} className=' border-2 border-gray-400'>BookMartList</button>
            </div>

            {/* this is data list */}
             {defaultData === "defaultlist" ?
              <>
             <h1>Data List</h1>
              <p className="mr-2 text-gray-600">Search:</p>
                <input className=" w-80 border border-gray-400" value={users} onChange={(e) => setUsers(e.target.value) }></input>
                <button className="ml-4 border-2 border-gray-400" onClick={() => setUsers("")}>Clear Field</button>
                <ul className="flex flex-col gap-4 py-4">{data.map((item , index) => 
                        <div key={index} className="flex flex-row gap-8 items-center ">
                        <p >Login : {item.login}</p>
                        <img src={item.avatar_url} className="w-32 h-32"></img>
                        <button className='border-2 border-black h-fit p-2' onClick={() => handleBookMartData(item)}>Bookmart the data </button>
                        </div>
                    )}</ul>
             </> : <>
             
               {/* this is bookmartList  */}
            {bookMart.length === 0 ? <div>No data found</div> :    
            <>
            <h1>BookMartList</h1>
                 <p className="mr-2 text-gray-600">Search:</p>
                <input className=" w-80 border border-gray-400" value={bookMartSearch} onChange={(e) => setBookMartSearch(e.target.value) }></input>
                <button className="ml-4 border-2 border-gray-400" onClick={() => setBookMartSearch("")}>Clear Field</button>
            <ul>{finalBookMartData.map((item ,index) => 
                <div key={index}> 
                    <div>{item.login}</div>
                    <img src={item.avatar_url} className="w-32 h-32"/>
                    <button onClick={() => handleRemoveFromBookMart(item)} className="border-2 border-gray-400 mt-2">Remove From Bookmart</button>
                </div>)}
            </ul>
            </>}
            </>
            }
        </>
  )
}

export default DataList