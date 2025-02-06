import React from 'react';

const BookmarkUser = ({addedData}) => {
  return <div>


    {
      addedData.map((items)=>{
        return(
          <div>

            <div key={item.id} className="flex align-center gap-4 p-8  ">
              <img class="w-10 h-10 rounded-full" src={item.avatar_url}
                   alt="Rounded avatar" />
              <h1>{item.login}</h1>
              <button className="flex  bg-blue-500 justify-between text-white py-1 px-6 rounded">Remove
              </button>
            </div>
          </div>
        )
      })
    }

  </div>;
};

export default BookmarkUser;