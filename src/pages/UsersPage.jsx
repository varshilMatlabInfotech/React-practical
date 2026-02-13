import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadSearchUsers, loadUsers } from '../actions/userActions';
import { SEARCH_USERS_PER_PAGE } from '../utils/githubConfig';
import useThrottle from '../utils/useThrottle';
import SearchBar from '../common/components/SearchBar';
import UserCard from '../common/components/UserCard';
import Pagination from '../common/components/Pagination';

export default function UsersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const usersState = useSelector((state) => state.users);
  const {
    users,
    loading,
    error,
    searchTerm,
    searchResults,
    searchLoading,
    searchError,
    searchHasMore,
    searchTotal,
    searchPage,
    searchQuery,
    searchPerPage,
    usersPageHistory,
    usersPageIndex,
    usersHasNext,
    usersPerPage,
  } = usersState;

  const throttledSearch = useThrottle(searchTerm, 300);

  useEffect(() => {
    if (users.length === 0) {
      loadUsers(dispatch, usersState, { reset: true });
    }
  }, [dispatch, users.length, usersState]);

  const trimmedSearch = throttledSearch.trim();
  const isSearching = trimmedSearch.length > 0;

  useEffect(() => {
    if (isSearching) {
      if (trimmedSearch !== searchQuery && !searchLoading) {
        loadSearchUsers(
          dispatch,
          {
            searchLoading,
            searchQuery,
            searchPerPage,
          },
          trimmedSearch,
          { reset: true, page: 1 },
        );
      }
    } else if (searchQuery) {
      dispatch({ type: 'CLEAR_SEARCH_RESULTS' });
    }
  }, [dispatch, isSearching, trimmedSearch, searchQuery, searchLoading, searchPerPage]);

  const totalSearchPages = searchTotal > 0 ? Math.ceil(Math.min(searchTotal, 1000) / (searchPerPage || SEARCH_USERS_PER_PAGE)) : 0;

  const hasCachedNextPage = usersPageHistory?.[usersPageIndex + 1];

  const handlePrevPage = () => {
    if (usersPageIndex > 0) {
      dispatch({
        type: 'SET_USERS_PAGE',
        payload: usersPageIndex - 1,
      });
    }
  };

  const handleNextPage = () => {
    if (hasCachedNextPage) {
      dispatch({
        type: 'SET_USERS_PAGE',
        payload: usersPageIndex + 1,
      });
    } else {
      loadUsers(dispatch, usersState);
    }
  };

  const handleSearchPage = (page) => {
    loadSearchUsers(
      dispatch,
      {
        searchLoading,
        searchHasMore,
        searchQuery,
        searchPage,
        searchPerPage,
      },
      trimmedSearch,
      { page },
    );
  };

  const handlePerPageChange = (event) => {
    const nextValue = Number(event.target.value);
    if (!Number.isNaN(nextValue)) {
      dispatch({
        type: 'SET_USERS_PER_PAGE',
        payload: nextValue,
      });
    }
  };

  const filteredUsers = isSearching ? searchResults : users;

  const handleSelect = (user) => {
    navigate(`/user/${user.login}`, {
      state: { from: location.pathname || '/' },
    });
  };

  const pageLabel = isSearching ? `Page ${searchPage}${totalSearchPages ? ` of ${totalSearchPages}` : ''}` : `Page ${usersPageIndex + 1}`;

  return (
    <>
      <div className="flex items-center gap-3">
        <SearchBar />{' '}
        <button
          onClick={() =>
            isSearching
              ? loadSearchUsers(
                  dispatch,
                  {
                    searchLoading,
                    searchHasMore,
                    searchQuery,
                    searchPage,
                    searchPerPage,
                  },
                  trimmedSearch,
                  { page: searchPage, reset: true },
                )
              : loadUsers(dispatch, usersState, { reset: true })
          }
          className="w-auto min-w-40 h-11 mb-6 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4  text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-sm transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSearching ? searchLoading : loading}
        >
          {isSearching ? (searchLoading ? 'Refreshing...' : 'Refresh Search') : loading ? 'Refreshing...' : 'Pull to Refresh'}
        </button>
      </div>

      {isSearching && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
          <p>
            Showing results for <span className="font-semibold text-slate-900">{trimmedSearch}</span>
          </p>
          {typeof searchTotal === 'number' && <p className="text-slate-500">{searchTotal} results</p>}
        </div>
      )}

      {isSearching && searchError && <p className="mb-4 text-sm text-red-600">{searchError}</p>}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
        <div className="scroll-panel max-h-[58vh] space-y-4 pr-2 sm:max-h-[60vh] md:max-h-[65vh] lg:max-h-[70vh]">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onSelect={handleSelect} />
          ))}

          {!loading && !searchLoading && filteredUsers.length === 0 && (
            <p className="text-sm text-slate-500">{isSearching ? 'No users found for this query.' : 'No users found.'}</p>
          )}
        </div>
      </div>

      <Pagination
        pageLabel={pageLabel}
        onPrev={() => (isSearching ? handleSearchPage(searchPage - 1) : handlePrevPage())}
        onNext={() => (isSearching ? handleSearchPage(searchPage + 1) : handleNextPage())}
        prevDisabled={isSearching ? searchPage <= 1 || searchLoading : usersPageIndex <= 0 || loading}
        nextDisabled={
          isSearching
            ? searchLoading || (!searchHasMore && (totalSearchPages ? searchPage >= totalSearchPages : true))
            : loading || (!usersHasNext && !hasCachedNextPage)
        }
        perPageOptions={[10, 20, 50, 100]}
        perPageValue={usersPerPage}
        onPerPageChange={handlePerPageChange}
      />
    </>
  );
}
