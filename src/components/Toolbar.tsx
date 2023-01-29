import React from 'react'
import { db } from '../data/db';
import { useLiveQuery } from "dexie-react-hooks";

function Toolbar() {
  const file = useLiveQuery(() => db.files.where({ focused: 1 }).first());

  if(!file) return null; 

  return (
    <div className='w-full flex items-center justify-between bg-zinc-800 p-2 text-white'>
      <div className='flex items-center space-x-2 font-medium'>
        <i className="ri-bubble-chart-line text-xl"></i>
        <span>{file.name}</span> 
      </div>
      <div className='flex items-center space-x-2 font-medium bg-zinc-700 px-2 rounded'>
        <i className="ri-server-line text-lg text-zinc-300"></i>
        <span>http://localhost:8890/sparql</span> 
      </div>
    </div>
  )
}

export default Toolbar