const BookMarkCard = ({ BookMarkData,loading,isFromSaveBookmark}) => {
  const handleBookmark = (card) => {
    const existing = JSON.parse(localStorage.getItem("bookmarks")) || [];
    
    // Check for duplicate
    const alreadyBookmarked = existing.some((item) => item.id === card.id);
    if (!alreadyBookmarked) {
      const updated = [...existing, card];
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      alert("Card bookmarked!");
    } else {
      alert("Already Card bookmarked!");
    }
  };

 const handleUnSaveBookmark =(card)=>{
  const existing = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const FilteredBookmarked = existing.filter((item) => item.id !== card.id);
  console.log("alreadyBookmarked",FilteredBookmarked)
  localStorage.setItem("bookmarks", JSON.stringify(FilteredBookmarked));
  alert("bookmarked Removed");
  window.location.reload();
 }
  return (
    <>
    {!loading ? <h1>Loading....</h1>: ""}
      {BookMarkData.map((item) => {
        return (
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={item.avatar_url} alt="Bonnie image" />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{item.login}</h5>
              <button type = "submit" className={isFromSaveBookmark ? "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900":"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"} onClick={()=> isFromSaveBookmark ? handleUnSaveBookmark(item) :handleBookmark(item)}>{isFromSaveBookmark? "Unsave BookMark":"Save BookMark"}</button>
             </div>
          </div>
        );
      })}
    </>
  );
};

export default BookMarkCard;
