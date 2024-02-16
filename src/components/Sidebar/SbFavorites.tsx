import React from 'react'
import { db } from '../../data/db';
import { useLiveQuery } from "dexie-react-hooks";

function SbFavorites() {
  function deleteFavorite(file) {
    db.files.update(file, {
      favorite: -1
    })
  }

  function setFile(fileId) {
    db.files.where('focused').equals(1).modify({focused: 0});
    db.files.update(fileId, { focused: 1 });
  }

  const favorites = useLiveQuery(() => db.files.where({favorite: 1}).toArray());

  return (
    <div className='border-t border-neutral-400'>
      <div className='flex items-center justify-between space-x-1 pl-2 pr-3 py-2 bg-zinc-200'>
        <i className="ri-star-line text-base"></i>
        <h2 className='text-xs font-medium text-zinc-900 uppercase flex-1'>Favorites</h2> 
      </div>
      <div className='p-2 space-y-px'>
        {favorites?.map((file, index) => (
            <div key={index} className={`flex items-center space-x-1 cursor-pointer border border-transparent text-xs p-1 rounded  ${file.focused && "bg-white text-black  border border-yellow-700 ring-offset-2 hover:border-black"}`} >
              <i className={`ri-star-line text-base ${file.focused && "text-yellow-600"}`}></i>
              <div className='flex-1' onClick={() => setFile(file.id)}>{file.name}</div>
              <button className='hover:text-red-500 rounded-full flex items-center justify-center h-5 w-5 ' onClick={() => deleteFavorite(file)}>
                <i className="ri-close-line "></i>
              </button> 
            </div> 
          ))}
      </div>
    </div>
  )
}

export default SbFavorites