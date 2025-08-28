import React from "react";

export const Sidebar = ({ activeMenu, onMenuChange }) => {
    const menus = [
        { id: "users", label: "Users" },
        { id: "bookmarks", label: "Bookmarked Users" },
        { id: "tabs", label: "Tabs Design" },
    ];

    return (
        <div className="w-64 bg-gray-100 h-screen p-5 shadow-md flex flex-col">
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            <div className="flex-1 overflow-y-auto">
                <ul className="flex flex-col gap-2">
                    {menus.map((menu) => (
                        <li key={menu.id}>
                            <button
                                onClick={() => onMenuChange(menu.id)}
                                className={`w-full text-left px-4 py-2 rounded-md font-medium transition-colors duration-300
                  ${activeMenu === menu.id ? "bg-blue-500 text-white" : "hover:bg-blue-100"}`}
                            >
                                {menu.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
