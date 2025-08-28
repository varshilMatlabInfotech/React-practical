import { useState } from "react";

export const SearchBar = ({ onSearch }) => {
    const [value, setValue] = useState("");

    const handleChange = ({ target }) => {
        setValue(target.value);
        onSearch(target.value);
    };

    return (
        <div className="mt-4">
            <input
                type="text"
                placeholder="Search users..."
                value={value}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
        </div>
    );
}
