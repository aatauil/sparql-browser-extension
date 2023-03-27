import React from 'react'
import { db } from '../../data/db';
import { useLiveQuery } from "dexie-react-hooks";

function SbFavorites() {
  const favorites = useLiveQuery(() => db.files.where({favorite: 1}).toArray());

  return (
    <div className='border-t border-neutral-400 px-4 py-2 bg-neutral-100'>
    <h2 className='text-xs font-medium text-zinc-700 uppercase'>Favorites</h2> 
    <div className='space-y-1'>
      {favorites?.map((file, index) => (
          <div key={index} className={`flex items-center space-x-1 cursor-pointer text-xs p-1 rounded hover:bg-zinc-100 ${file.focused && "text-zinc-900 font-medium bg-zinc-100"}`} >
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