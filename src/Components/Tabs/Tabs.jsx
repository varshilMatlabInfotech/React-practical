import BookMark from 'pages/BookMark/BookMark';
import SavedBookmark from 'pages/SavedBookmark/SavedBookmark';
import React, { useState } from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("BookMark");

  const renderComponent = () => {
    switch (activeTab) {
      case "BookMark":
        return <BookMark />;
      case "SavedBookMark":
        return <SavedBookmark />;
      default:
        return <BookMark />;
    }
  };
  return (
    <div className="p-4">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200" role="tablist">
        <li className="me-2">
          <button
            className={`inline-block p-4 rounded-t-lg ${activeTab === "BookMark" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-gray-600"}`}
            onClick={() => setActiveTab("BookMark")}
          >
            BookMark
          </button>
        </li>
        <li className="me-2">
          <button
            className={`inline-block p-4 rounded-t-lg ${activeTab === "SavedBookMark" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-gray-600"}`}
            onClick={() => setActiveTab("SavedBookMark")}
          >
            SavedBookMark
          </button>
        </li>
           </ul>

      <div className="mt-4">{renderComponent()}</div>
    </div>
  );
};

export default Tabs;

