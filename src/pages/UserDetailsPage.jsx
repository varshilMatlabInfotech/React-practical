import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  loadUserCollection,
  loadUserDetails,
} from "../actions/userActions";
import UserCard from "../common/components/UserCard";
import RepoCard from "../common/components/RepoCard";
import Pagination from "../common/components/Pagination";

const formatValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  return value;
};

const formatDate = (value) => {
  if (!value) {
    return "Not provided";
  }

  try {
    return new Date(value).toLocaleDateString();
  } catch {
    return value;
  }
};

const withHttps = (value) => {
  if (!value) {
    return value;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `https://${value}`;
};

const emptyCollection = {
  items: [],
  page: 1,
  hasMore: true,
  loading: false,
  error: null,
};

export default function UserDetailsPage() {
  const dispatch = useDispatch();
  const { login } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const usersState = useSelector((state) => state.users);
  const {
    users,
    bookmarks,
    userDetailsByLogin,
    detailsLoading,
    detailsLoadingLogin,
    detailsError,
    userCollections,
  } = usersState;

  const cachedDetails = userDetailsByLogin[login];

  useEffect(() => {
    if (login) {
      loadUserDetails(
        dispatch,
        { detailsLoading, detailsLoadingLogin, cachedDetails },
        login
      );
    }
  }, [
    dispatch,
    login,
    detailsLoading,
    detailsLoadingLogin,
    cachedDetails,
  ]);

  const followersState =
    userCollections?.[login]?.followers || emptyCollection;
  const followingState =
    userCollections?.[login]?.following || emptyCollection;
  const reposState =
    userCollections?.[login]?.repos || emptyCollection;

  useEffect(() => {
    if (!login) {
      return;
    }

    if (
      activeTab === "followers" &&
      followersState.items.length === 0 &&
      !followersState.loading
    ) {
      loadUserCollection(
        dispatch,
        login,
        "followers",
        followersState,
        { page: 1, reset: true }
      );
    }

    if (
      activeTab === "following" &&
      followingState.items.length === 0 &&
      !followingState.loading
    ) {
      loadUserCollection(
        dispatch,
        login,
        "following",
        followingState,
        { page: 1, reset: true }
      );
    }

    if (
      activeTab === "repos" &&
      reposState.items.length === 0 &&
      !reposState.loading
    ) {
      loadUserCollection(
        dispatch,
        login,
        "repos",
        reposState,
        { page: 1, reset: true }
      );
    }
  }, [
    activeTab,
    dispatch,
    followersState.items.length,
    followersState.loading,
    followingState.items.length,
    followingState.loading,
    reposState.items.length,
    reposState.loading,
    login,
  ]);

  const baseUser =
    users.find((user) => user.login === login) ||
    bookmarks.find((user) => user.login === login);
  const details = userDetailsByLogin[login] || baseUser;

  const isLoading =
    detailsLoading &&
    detailsLoadingLogin === login &&
    !userDetailsByLogin[login];

  const isBookmarked = details
    ? bookmarks.some((user) => user.id === details.id)
    : false;

  const backTarget = location.state?.from || "/";

  const tabs = useMemo(
    () => [
      { key: "overview", label: "Overview" },
      { key: "repos", label: "Repositories" },
      { key: "followers", label: "Followers" },
      { key: "following", label: "Following" },
    ],
    []
  );

  const activeTabClasses =
    "rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm";
  const inactiveTabClasses =
    "rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-300";

  const handleSelectUser = (user) => {
    if (!user?.login) {
      return;
    }

    navigate(`/user/${user.login}`, {
      state: { from: backTarget },
    });
  };

  const renderPagination = (collectionKey, state) => (
    <Pagination
      className="mt-4 flex flex-wrap items-center justify-between gap-3"
      pageLabel={`Page ${state.page}`}
      onPrev={() =>
        loadUserCollection(
          dispatch,
          login,
          collectionKey,
          state,
          { page: state.page - 1 }
        )
      }
      prevDisabled={state.loading || state.page <= 1}
      onNext={() =>
        loadUserCollection(
          dispatch,
          login,
          collectionKey,
          state,
          { page: state.page + 1 }
        )
      }
      nextDisabled={state.loading || !state.hasMore}
      onRefresh={() =>
        loadUserCollection(
          dispatch,
          login,
          collectionKey,
          state,
          { page: state.page, reset: true }
        )
      }
      refreshDisabled={state.loading}
      refreshLabel="Refresh Page"
    />
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link
          to={backTarget}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300"
        >
          Back
        </Link>

        {details && (
          <button
            onClick={() =>
              dispatch({
                type: "TOGGLE_BOOKMARK",
                payload: details,
              })
            }
            className={`rounded-lg px-4 py-2 text-sm font-semibold shadow-sm ${
              isBookmarked
                ? "bg-rose-500 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            {isBookmarked ? "Unbookmark" : "Bookmark"}
          </button>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              {details?.avatar_url ? (
                <img
                  src={details.avatar_url}
                  alt={details.login || "User avatar"}
                  className="h-24 w-24 rounded-2xl object-cover"
                />
              ) : (
                <div className="h-24 w-24 animate-pulse rounded-2xl bg-slate-200" />
              )}
            </div>
            <div>
              <p className="text-xs text-slate-500">GitHub Profile</p>
              <h2 className="text-2xl font-semibold text-slate-900">
                {details?.name || details?.login || "User"}
              </h2>
              <p className="text-sm text-slate-600">
                @{details?.login || "unknown"}
              </p>
              {details?.bio && (
                <p className="mt-2 max-w-xl text-sm text-slate-600">
                  {details.bio}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={
                  activeTab === tab.key
                    ? activeTabClasses
                    : inactiveTabClasses
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {detailsError && (
            <p className="text-sm text-red-600">
              {detailsError}
            </p>
          )}

          {isLoading && (
            <p className="text-sm text-slate-500">
              Loading user details...
            </p>
          )}

          {!details && !isLoading && (
            <p className="text-sm text-slate-500">
              User details not available.
            </p>
          )}

          {details && activeTab === "overview" && (
            <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Location
                </p>
                <p className="mt-1 text-base font-medium text-slate-900">
                  {formatValue(details.location)}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Company
                </p>
                <p className="mt-1 text-base font-medium text-slate-900">
                  {formatValue(details.company)}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Blog
                </p>
                <p className="mt-1 text-base font-medium text-slate-900">
                  {details.blog ? (
                    <a
                      href={withHttps(details.blog)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      {details.blog}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Email
                </p>
                <p className="mt-1 text-base font-medium text-slate-900">
                  {formatValue(details.email)}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Twitter
                </p>
                <p className="mt-1 text-base font-medium text-slate-900">
                  {details.twitter_username ? (
                    <a
                      href={`https://twitter.com/${details.twitter_username}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      @{details.twitter_username}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Public Repos
                </p>
                <p className="mt-1 text-base font-medium text-slate-900">
                  {formatValue(details.public_repos)}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Public Gists
                </p>
                <p className="mt-1 text-base font-medium text-slate-900">
                  {formatValue(details.public_gists)}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Followers
                </p>
                <p className="mt-1 text-base font-medium text-slate-900">
                  {formatValue(details.followers)}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Following
                </p>
                <p className="mt-1 text-base font-medium text-slate-900">
                  {formatValue(details.following)}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Profile
                </p>
                <p className="mt-1 text-base font-medium text-slate-900">
                  {details.html_url ? (
                    <a
                      href={details.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      {details.html_url}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Joined
                </p>
                <p className="mt-1 text-base font-medium text-slate-900">
                  {formatDate(details.created_at)}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Last Updated
                </p>
                <p className="mt-1 text-base font-medium text-slate-900">
                  {formatDate(details.updated_at)}
                </p>
              </div>
            </div>
          )}

          {activeTab === "repos" && (
            <div className="grid gap-4">
              {reposState.error && (
                <p className="text-sm text-red-600">
                  {reposState.error}
                </p>
              )}
              {reposState.items.length === 0 &&
                !reposState.loading && (
                  <p className="text-sm text-slate-500">
                    No repositories available.
                  </p>
                )}
              {reposState.items.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
              {renderPagination("repos", reposState)}
            </div>
          )}

          {activeTab === "followers" && (
            <div className="grid gap-4">
              {followersState.error && (
                <p className="text-sm text-red-600">
                  {followersState.error}
                </p>
              )}
              {followersState.items.length === 0 &&
                !followersState.loading && (
                  <p className="text-sm text-slate-500">
                    No followers yet.
                  </p>
                )}
              {followersState.items.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onSelect={handleSelectUser}
                />
              ))}
              {renderPagination(
                "followers",
                followersState
              )}
            </div>
          )}

          {activeTab === "following" && (
            <div className="grid gap-4">
              {followingState.error && (
                <p className="text-sm text-red-600">
                  {followingState.error}
                </p>
              )}
              {followingState.items.length === 0 &&
                !followingState.loading && (
                  <p className="text-sm text-slate-500">
                    Not following anyone yet.
                  </p>
                )}
              {followingState.items.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onSelect={handleSelectUser}
                />
              ))}
              {renderPagination(
                "following",
                followingState
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
