import React from 'react'
import { db } from '../data/db';
import { useLiveQuery } from "dexie-react-hooks";

function Toolbar() {
  const file = useLiveQuery(() => db.files.where({ focused: 1 }).first());
  const workspace = useLiveQuery(() => db.workspaces.where({ id: file?.workspaceId || -1 }).first(), [file]);

  async function query() {
    try {
    const res = await fetch('https://dbpedia.org/sparql', {
        method: 'POST',
        body: file.code,
        headers: {
          'Accept': 'application/sparql-results+json,*/*;q=0.9',
          'Content-Type': 'application/sparql-query'
        }
      })

      const output = await res.json();

      db.files.update(file, {
        output: output.results.bindings
      })
    } catch(err)  {
      console.dir(err)
    }
  }

  function isFavorite() {
    if(file.favorite == 1) {
      return "ri-star-fill text-yellow-400"
    } else {
      return "ri-star-line text-zinc-400";
    }
  }

  function toggleFavorite() {
    db.files.update(file, {
      favorite: file.favorite == 1 ? 0 : 1
    })
  }


  if(!file) return null; 

  return (
    <div className='w-full flex items-center justify-between p-4 border-b border-zinc-300'>
      <div className='flex-1 space-y-2'>
        <div className='flex items-center space-x-2'>
          <button onClick={() => toggleFavorite()}>
            <i className={`text-xl ${isFavorite()}`}></i>
          </button>
          <span className='text-xl font-medium'>{file.name}</span>
        </div>
        <div className='flex items-center space-x-4'>
          {workspace && 
            <div className='flex items-center space-x-1 font-medium text-zinc-800 border px-2 rounded bg-zinc-100'>
              <i className="ri-layout-2-line text-base text-blue-600"></i>
              <span>{workspace?.name}</span>
            </div>
          }
          <div className='flex items-center space-x-1 text-zinc-600'>
            <i className="ri-time-line text-base"></i>
            <span className='font-medium text-xs'>{file.created.toLocaleString("en-GB")}</span>
          </div>
          <div className='flex items-center space-x-1 text-zinc-600'>
            <i className="ri-file-edit-line text-base"></i>
            <span className='font-medium text-xs'>{file.modified.toLocaleString("en-GB")}</span>
          </div>
        </div>

      </div>
      <div className='space-y-1'>
        <div className='flex items-center justify-end space-x-2 flex'>
          <button onClick={query} className='flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white text-sm px-2 py-1.5 pr-6 rounded'>
            <i className="ri-play-line text-lg leading-none"></i>
            <div className='font-medium'>Run</div>
          </button>
        </div>
        <div className='flex items-center space-x-2 font-medium px-2 rounded bg-zinc-100 border'>
          <i className="ri-server-line text-lg"></i>
          <span>http://localhost:8890/sparql</span> 
        </div>
      </div>

    </div>
  )
}

export default Toolbar