import React from "react";
import { db } from "../../data/db";
import { useLiveQuery } from "dexie-react-hooks";

function SbFavorites() {
  function deleteFavorite(file) {
    db.files.update(file, {
      favorite: -1
    });
  }

  function setFile(fileId) {
    db.files.where("focused").equals(1).modify({ focused: 0 });
    db.files.update(fileId, { focused: 1 });
  }

  const favorites = useLiveQuery(() =>
    db.files.where({ favorite: 1 }).toArray()
  );

  const isEmpty = () => favorites?.length == 0;

  return (
    <div className="border-t border-gray-300">
      <div className="flex items-center justify-between space-x-1 bg-gray-200/50 py-2 pl-3 pr-3">
        <i className="ri-star-line text-base leading-3 text-gray-500"></i>
        <h2 className="flex-1 text-xs font-medium uppercase text-gray-900">
          Favorites
        </h2>
      </div>
      <div className="space-y-px p-2">
        {favorites?.map((file, index) => (
          <div
            key={index}
            className={`flex cursor-pointer items-center space-x-1 rounded border border-transparent p-1 text-xs hover:bg-gray-200 ${file.focused && "border border-yellow-700 bg-white text-black ring-offset-2 hover:border-black hover:bg-white"}`}>
            <i
              className={`ri-star-line text-base ${file.focused && "text-yellow-600"}`}></i>
            <div className="flex-1" onClick={() => setFile(file.id)}>
              {file.name}
            </div>
            <button
              className="flex h-5 w-5 items-center justify-center rounded-full hover:text-red-500"
              onClick={() => deleteFavorite(file)}>
              <i className="ri-close-line"></i>
            </button>
          </div>
        ))}

        {isEmpty() && (
          <div className="rounded px-1 py-2 text-center text-[10px] text-gray-400">
            click on the star next to the title to add queries to favorites
          </div>
        )}
      </div>
    </div>
  );
}

export default SbFavorites;
