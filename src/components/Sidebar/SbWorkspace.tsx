import React, { useRef, useState } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { db } from '../../data/db';
import { useLiveQuery } from "dexie-react-hooks";

function SbWorkspace() {
  const wsInput = useRef()

  const [selectedWs, setSelectedWs] = useState(false);
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

  async function deleteWorkspace() {
    await db.files.where({workspaceId: selectedWs.id}).delete();
    await db.workspaces.where({id : selectedWs.id}).delete();
    setSelectedWs(false)
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
            <div className='flex-1 text-ellipsis overflow-hidden whitespace-nowrap'>{ws.name}</div>
            <button className='hover:text-red-500 rounded-full text-gray-700 flex items-center justify-center h-5 w-5 '>
              <i className="ri-close-line " onClick={() => setSelectedWs(ws)}></i>
            </button> 
          </div> 
        ))}
      </div>

      { selectedWs && 
        <div className="relative z-10" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
          <div className="fixed inset-0 z-10 overflow-y-auto" onClick={() => setSelectedWs(false)}>
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" >
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" onClick={(e) => e.stopPropagation()}>
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
    
                      <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                      <h3 className="text-lg font-base leading-6 text-gray-900" id="modal-title">Delete Workspace <span className='font-medium'>{selectedWs.name}</span></h3>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">Deleting this workspace will also <strong>delete all queries</strong> inside of it. This action cannot be undone.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-2 py-3 flex items-center justify-between">
                  <button type="button" onClick={() => deleteWorkspace()} className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Delete permanently</button>
                  <button type="button" onClick={() => setSelectedWs(false)} className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" >Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default SbWorkspace