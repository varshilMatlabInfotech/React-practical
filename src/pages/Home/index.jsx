import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PullToRefresh from "react-simple-pull-to-refresh";
import { fetchUsers } from "../../store/actions/usersActions";
import { resetUsers } from "../../reducers/userReducer";
import ReactPaginate from "react-paginate";
import { Tabs } from "../../component/Tabs";
import { SearchBar } from "../../component/SearchBar";
import { Sidebar } from "../../component/Sidebar";
import { UserCard } from '../../component/UserCard/index';


export const Home = () => {
    const dispatch = useDispatch();
    const { list, bookmarks, perPage, TotalDataLength } = useSelector((s) => s.users);

    const [activeMenu, setActiveMenu] = useState("users");
    const [tab, setTab] = useState("users");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (list.length === 0) {
            dispatch(fetchUsers({ since: 0, perPage }));
        }
    }, [dispatch, list, perPage]);

    const filtered = useMemo(() => {
        let src = [];
        if (activeMenu === "users") src = list;
        else if (activeMenu === "bookmarks") src = bookmarks;
        else if (activeMenu === "tabs") src = tab === "users" ? list : bookmarks;

        const q = search.trim().toLowerCase();
        if (!q) return src;
        return src.filter((u) => u.login.toLowerCase().includes(q));
    }, [activeMenu, tab, list, bookmarks, search]);

    const handlePageChange = useCallback(({ selected }) => {
        const nextSince = selected * perPage;
        setPage(selected);
        dispatch(fetchUsers({ since: nextSince, perPage }));
    },
        [dispatch, perPage]
    );
    const loadMore = useCallback(() => {
        const nextPage = page + 1;
        setPage(nextPage);
        dispatch(fetchUsers({ page: nextPage, perPage }));
    }, [dispatch, page, perPage]);

    const refresh = useCallback(async () => {
        dispatch(resetUsers());
        await dispatch(fetchUsers({ since: 0, perPage }));
        setPage(0);
    }, [dispatch, perPage]);


    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
            <div className="flex-1 flex flex-col p-3 mx-auto">
                {activeMenu === "tabs" && (
                    <Tabs
                        tabs={[
                            { value: "users", label: "Users" },
                            { value: "bookmarks", label: "Bookmarked Users" },
                        ]}
                        activeTab={tab}
                        onChange={setTab}
                    />
                )}

                <SearchBar onSearch={setSearch} />

                <PullToRefresh onRefresh={refresh}>
                    <div className="flex-1 overflow-y-auto mt-4">
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "1rem" }}>
                            {filtered.map((user) => (
                                <UserCard key={user.id} user={user} />
                            ))}
                        </div>

                        <ReactPaginate
                            previousLabel={"← Previous"}
                            nextLabel={"Next →"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(TotalDataLength / perPage)}
                            forcePage={Math.min(page, Math.ceil(TotalDataLength / perPage) - 1)}
                            onPageChange={handlePageChange}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            containerClassName="flex justify-center items-center gap-2 text-sm"
                            pageClassName="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
                            activeClassName="bg-blue-500 text-white border-blue-500"
                            previousClassName="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
                            nextClassName="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
                            disabledClassName="opacity-50 cursor-not-allowed"
                        />

                        {list.length < TotalDataLength && (
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={loadMore}
                                    className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                </PullToRefresh>
            </div>
        </div>

    );
}
