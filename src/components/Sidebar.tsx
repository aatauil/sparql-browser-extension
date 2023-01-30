import React, { useRef } from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import { db } from '~data/db';
import { useState } from 'react';
import SbFiles from './Sidebar/SbFiles';
import useOnClickOutside from '~hooks/useOnClickOutside';

function Sidebar() {
  const wsInput = useRef()

  const [isCreatingWs, setIsCreatingWs] = useState(false);
  const [wsName, setWsName] = useState("");

  const focusedWorkspace = useLiveQuery(() => db.workspaces.where({ focused: 1 }).first());
  const workspaces = useLiveQuery(() => db.workspaces.toArray());
  const favorites = useLiveQuery(() => db.files.where({favorite: 1}).toArray());

  useOnClickOutside(wsInput, () => {
    setIsCreatingWs(false)
  })
  
  async function addWorkspace() {
    const now = new Date()

    db.workspaces.where('focused').equals(1).modify({focused: 0});
    db.files.where('focused').equals(1).modify({focused: 0});

    db.workspaces.add({
      name: wsName,
      focused: 1,
      created: now
    });
    
  }

  function deleteFavorite(file) {
    db.files.update(file, {
      favorite: -1
    })
  }

  function setWorkspace(workspace) {
    db.workspaces.where('focused').equals(1).modify({focused: 0});
    db.files.where('focused').equals(1).modify({focused: 0});

    db.workspaces.update(workspace, { focused: 1 });
  }
  
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsCreatingWs(false)
      setWsName("")
    }
    if (event.key === 'Enter') {
      addWorkspace()
      setIsCreatingWs(false)
      setWsName("")
    }
  };

  function setFile(fileId) {
    db.files.where('focused').equals(1).modify({focused: 0});
    db.files.update(fileId, { focused: 1 });
  }


  return (
    <div className='flex flex-col text-gray-600 h-full w-60 border-r border-zinc-300'> 
      <div className='flex items-center space-x-2 bg-zinc-100 p-3 text-sm'>
        <i className="ri-bubble-chart-fill text-blue-600"></i>
        <h1 className='font-medium'>Sparql browser extention</h1>
      </div> 
      <div className='py-4'>
        <div className='flex items-center justify-between px-3 mb-2'>
          <h2 className='text-sm font-medium text-zinc-900'>Workspaces</h2> 
          <button className='bg-blue-600 px-1 py-.5 text-white text-md rounded hover:bg-blue-500' onClick={() => setIsCreatingWs(true)}>
            <i className="ri-add-line text-sm"></i>
          </button>
        </div>

        <div className='p-2 space-y-1'>
          {isCreatingWs ?
            <div ref={wsInput} className='flex items-center space-x-1 cursor-pointer border text-xs p-1 rounded font-medium'>
              <i className="ri-layout-2-line text-base"></i>
              <input autoFocus type="text" value={wsName} onChange={(e) => setWsName(e.target.value)} onKeyDown={handleKeyDown} className='w-full p-1 pl-0 rounded border-none focus:ring-0 text-xs' placeholder='Workspace name'/>
            </div>
            : 
            ""
          }

          {workspaces?.map((ws, index) => (
            <div key={index} onClick={() => setWorkspace(ws)} className={`flex items-center space-x-1 cursor-pointer border text-xs p-1 rounded font-medium ${ws.focused ? "bg-blue-100 text-black border-2 border-blue-400" : "hover:bg-zinc-100"}`} >
              <i className="ri-layout-2-line text-base"></i>
              <div className='flex-1'>{ws.name}</div>
              <button className='hover:text-red-500 rounded-full text-gray-700 flex items-center justify-center h-5 w-5 '>
                <i className="ri-close-line "></i>
              </button> 
            </div> 
          ))}
        </div>
      </div>
      <SbFiles />
      <div className='border-t py-4'>
        <h2 className='px-3 text-sm font-medium text-zinc-900'>Favorite</h2> 
        <div className='p-2 space-y-1'>
          {favorites?.map((file, index) => (
              <div key={index} className={`flex items-center space-x-1 cursor-pointer text-xs p-1 rounded`} >
                <i className="ri-file-list-2-line text-base"></i>
                <div className='flex-1' onClick={() => setFile(file.id)}>{file.name}</div>
                <button className='hover:text-red-500 rounded-full text-gray-700 flex items-center justify-center h-5 w-5 ' onClick={() => deleteFavorite(file)}>
                  <i className="ri-close-line "></i>
                </button> 
              </div> 
            ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar