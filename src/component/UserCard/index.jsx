import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark } from "../../reducers/userReducer";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const { bookmarks } = useSelector((s) => s.users);
    const isBookmarked = bookmarks.some((u) => u.id === user.id);

    return (
        <div key={user.id} className="p-5 border rounded-xl mb-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between ">

                {/* Left: Avatar and main info */}
                <div className="flex items-start md:items-center gap-4">
                    <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="w-16 h-16 rounded-full border border-gray-200"
                    />
                    <div className="flex flex-col gap-1">
                        <p className="text-lg font-semibold">{user.login}</p>
                        <p className="text-sm text-gray-500">
                            Type: <span className="font-medium">{user.type}</span>
                            {user.site_admin && <span className="ml-2 text-red-500 font-semibold">Admin</span>}
                        </p>

                        {/* Links */}

                    </div>
                </div>

                {/* Right: Bookmark button */}

                <button
                    onClick={() => dispatch(toggleBookmark(user))}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    {isBookmarked ? (
                        <FaHeart className="text-red-500" size={20} />
                    ) : (
                        <FaRegHeart className="text-gray-500" size={20} />
                    )}
                </button>


            </div>
            <div className="flex flex-wrap gap-2 mt-1 text-sm pt-5">
                <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    Profile
                </a>
                <a
                    href={user.followers_url.replace("{/other_user}", "")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    Followers
                </a>
                <a
                    href={user.following_url.replace("{/other_user}", "")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    Following
                </a>
                <a
                    href={user.repos_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    Repos
                </a>
                <a
                    href={user.gists_url.replace("{/gist_id}", "")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    Gists
                </a>
            </div>
        </div>
    );
}
