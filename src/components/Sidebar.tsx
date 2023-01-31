import React, { useRef } from 'react'
import { db } from '../data/db';
import { useState } from 'react';
import { useLiveQuery } from "dexie-react-hooks";
import SbFiles from './Sidebar/SbFiles';
import SbWorkspace from './Sidebar/SbWorkspace';

function Sidebar() {

  const favorites = useLiveQuery(() => db.files.where({favorite: 1}).toArray());
 
 

  function deleteFavorite(file) {
    db.files.update(file, {
      favorite: -1
    })
  }

  function setFile(fileId) {
    db.files.where('focused').equals(1).modify({focused: 0});
    db.files.update(fileId, { focused: 1 });
  }


  return (
    <div className='flex flex-col text-gray-600 h-full w-60 border-r border-zinc-300'> 
      <div className='flex items-center space-x-2 p-3 text-sm border-b-2'>
        <i className="ri-bubble-chart-fill text-blue-600"></i>
        <h1 className='font-extrabold text-zinc-800'>Sparql browser extension</h1>
      </div> 
      <SbWorkspace />
      <SbFiles />
      <div className='border-t py-4'>
        <h2 className='px-3 text-sm font-medium text-zinc-900'>Favorite</h2> 
        <div className='p-2 space-y-1'>
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
      <div className='flex-1'></div>
      <div className='px-2'>
        <a href="https://github.com/aatauil/sparql-browser-extension" target="_blank" rel="noopener noreferrer">
          <i className="ri-github-fill text-2xl text-black hover:text-zinc-600"></i>
        </a>
      </div>
    </div>
  )
}

export default Sidebar