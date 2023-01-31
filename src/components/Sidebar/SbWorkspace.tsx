import React, { useRef, useState } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { db } from '../../data/db';
import { useLiveQuery } from "dexie-react-hooks";

function SbWorkspace() {
  const wsInput = useRef()

  const [isOpen, setIsOpen] = useState(false);
  const [isCreatingWs, setIsCreatingWs] = useState(false);
  const [wsName, setWsName] = useState("");

  const workspaces = useLiveQuery(() => db.workspaces.toArray());
  const focusedWorkspace = useLiveQuery(() => db.workspaces.where({ focused: 1 }).first());

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

  return (
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
          <div key={index} onClick={() => setWorkspace(ws)} className={`flex items-center space-x-1.5 cursor-pointer border text-xs p-2 rounded font-medium hover:bg-zinc-100 ${ws.focused && "bg-blue-100 text-black border border-blue-400 hover:bg-blue-100"}`} >
            <i className={`ri-layout-2-line text-lg ${ws.focused && "text-blue-700"}`}></i>
            <div className='flex-1'>{ws.name}</div>
            <button className='hover:text-red-500 rounded-full text-gray-700 flex items-center justify-center h-5 w-5 '>
              <i className="ri-close-line "></i>
            </button> 
          </div> 
        ))}
      </div>
    </div>
  )
}

export default SbWorkspace