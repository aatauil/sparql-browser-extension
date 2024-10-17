import React from "react";
import SbFiles from "./Sidebar/SbFiles";
import SbDatabases from "./Sidebar/SbDatabases";
import SbFavorites from "./Sidebar/SbFavorites";

function Sidebar() {
  return (
    <div className="flex h-full w-60 flex-col border-r border-gray-300 bg-gray-100 text-gray-800">
      <SbDatabases />
      <SbFiles />
      <SbFavorites />
      <div className="flex-1" />
      <div className="px-2">
        <a
          href="https://github.com/aatauil/sparql-browser-extension"
          target="_blank"
          rel="noopener noreferrer">
          <i className="ri-github-fill text-2xl text-gray-800 hover:text-gray-600" />
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
