import { NavLink, Outlet } from "react-router-dom";

export default function TabsContainer() {
  const baseTabClasses =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition";
  const inactiveClasses =
    "border border-gray-200 bg-white text-gray-600 hover:border-gray-300";
  const activeClasses =
    "bg-blue-600 text-white shadow-sm";

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-3">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${baseTabClasses} ${
              isActive ? activeClasses : inactiveClasses
            }`
          }
        >
          Users
        </NavLink>

        <NavLink
          to="/bookmarks"
          className={({ isActive }) =>
            `${baseTabClasses} ${
              isActive ? activeClasses : inactiveClasses
            }`
          }
        >
          Bookmarked Users
        </NavLink>
      </div>

      <Outlet />
    </>
  );
}
