import React, {useEffect, useState} from 'react';

const User = () => {
    const [user,setUser] = useState([]);
    const [bookMark,setBookMark] = useState([])
    const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
    const [search,setSearch] = useState("");

    const filteredUsers = bookMark.length > 0
        ? user.filter(u => bookMark.includes(u.id))
        : user;

    useEffect(()=>{
        const loadUser = async () => {
            try {
                const response = await fetch("https://api.github.com/users")
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const result = await response.json();
                setUser(result);
            }catch{
                console.log("getting error in fetching")
            }
        }

        loadUser()
    },[])

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-center font-bold text-3xl text-gray-800 mb-4">
                All Users
            </h1>

            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Name
            </label>
            <input
                type="text"
                id="name"
                placeholder="enter name"
                className="mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                onChange={(e)=>setSearch(e.target.value)}
            />


            {filteredUsers && filteredUsers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredUsers.map((element, index) => {
                        const isBookmarked = bookMark.includes(element?.id);
                        return (
                            <div key={element?.id || index} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center gap-3 transition-transform hover:scale-105">
                                <img className="rounded-full w-20 h-20 border-2 border-blue-500" src={element?.avatar_url} alt="user" />
                                <h1 className="text-lg font-semibold text-gray-700">{element?.login}</h1>

                                <button
                                    type="button"
                                    className={`text-white rounded px-4 py-2.5 text-sm focus:ring-4 ${isBookmarked ? 'bg-red-500 hover:bg-red-600 focus:ring-red-300' : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300'}`}
                                    onClick={() => {
                                        if (isBookmarked) {
                                            setBookMark(bookMark.filter(id => id !== element.id));
                                        } else {
                                            setBookMark(prev => [...prev, element?.id]);
                                        }
                                    }}
                                >
                                    {isBookmarked ? "Deselect" : "Select"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center text-gray-500 text-lg">No User Found</div>
            )}
        </div>
    );return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-center font-bold text-3xl text-gray-800 mb-8">All users</h1>

            {user && user.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {user.map((element, index) => (
            bookMark && bookMark.includes(element?.id) ? (
                <div
                    key={element?.id || index}
                    className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center gap-3 transition-transform hover:scale-105"
                >
                    <img
                        className="rounded-full w-20 h-20 border-2 border-blue-500"
                        src={element?.avatar_url}
                        alt="user profile"
                    />
                    <h1 className="text-lg font-semibold text-gray-700">{element?.login}</h1>
                    <button
                        type="button"
                        className="text-white bg-blue-500 rounded px-4 py-2.5 text-sm hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
                        onClick={() => {
                            setBookMark(prev => [...prev, element?.id]);
                        }}
                    >
                        Deselect
                    </button>
                </div>
            ) : (
                <div
                    key={element?.id || index}
                    className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center gap-3 transition-transform hover:scale-105"
                >
                    <img
                        className="rounded-full w-20 h-20 border-2 border-blue-500"
                        src={element?.avatar_url}
                        alt="user profile"
                    />
                    <h1 className="text-lg font-semibold text-gray-700">{element?.login}</h1>
                    <button
                        type="button"
                        className="text-white bg-blue-500 rounded px-4 py-2.5 text-sm hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
                        onClick={() => {
                            // Update state by adding the new ID to the existing array
                            setBookMark(prev => [...prev, element?.id]);
                        }}
                    >
                        Select
                    </button>
                </div>
            )
        ))}
    </div>
) : (
    <div className="text-center text-gray-500 text-lg">No User Found</div>
)}
        </div>
    );
};

export default User;






