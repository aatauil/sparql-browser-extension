import React, { useRef } from 'react'
import { db } from '../data/db';
import { useState } from 'react';

import SbFiles from './Sidebar/SbFiles';
import SbDatabases from './Sidebar/SbDatabases';
import SbFavorites from './Sidebar/SbFavorites';

function Sidebar() {
  return (
    <div className='flex flex-col text-gray-600 h-full w-60 border-r border-neutral-400 shadow-inner'> 
      <SbDatabases />
      <SbFiles />
      <SbFavorites />
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