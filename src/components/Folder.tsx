import React, { useRef, useEffect, useState } from 'react'
import { db } from '~data/db';
import File from './File';
import { useLiveQuery } from "dexie-react-hooks";
import { useDrop } from 'react-dnd';
import { useHover } from '../hooks/useHover';


function Folder({ data }) {  
  const [editMode, setEditMode] = useState(false);
  const [localName, setlocalName] = useState(data.name)

  const folderRef = useRef()
  const [hoverRef, isHovered] = useHover();
  const [, dropRef] = useDrop(() => ({
    accept: 'FILE',
    drop: () => ({ id: data.id }),
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })
  }))

  useEffect(function() {
    hoverRef.current = folderRef.current;
    dropRef.current = folderRef.current;
  }, [folderRef.current]);
  

  const files = useLiveQuery(() => db.files.where({ folderId: data.id }).toArray());

  function setCollapsed() {
    db.folders.update(data.id, {
      isCollapsed: data.isCollapsed ? 0 : 1
    })
  }

  async function addFile(e) {
    e.stopPropagation()
    const slug = generateSlug()
    const now = new Date().toISOString();
    db.files.add({
      name: slug, 
      folderId: data.id,
      code: 'SELECT * WHERE { ?s ?p ?o } LIMIT 10',
      output: null,
      inTab: true,
      created: now,
      modified: now
    });
    db.folders.update(data.id, { isCollapsed: 0 })
  }

  function updateFolderName() {
    if(!localName) return;

    db.folders.update(data.id, {
      name: localName
    });
    setEditMode(false)
  }

  return (
    <div className='text-base overflow-hidden'> 
      {editMode ? 
        <div className='flex justify-between items-center space-x-1 p-2 text-gray-800 hover:black w-full cursor-pointer hover:bg-zinc-200 rounded'>
         <div className='flex items-center space-x-2'>
           <i className={data.isCollapsed ? "ri-folder-fill text-blue-500" : "ri-folder-4-line text-blue-500"}></i>
           <input autoFocus type="text" name="folder-name" value={localName} onChange={(e) => setlocalName(e.target.value)} className='text-sm bg-white border border-gray-400 w-full p-1'/>
         </div>
          <div className='flex items-center text-gray-600 space-x-1.5 px-1'>
            <i className="ri-check-line hover:text-green-500" onClick={updateFolderName}></i>
            <i className="ri-close-line hover:text-red-500" onClick={() => setEditMode(false)}></i>
          </div>
       </div>  
        : 
        <div ref={folderRef} className='flex justify-between items-center space-x-1 p-2 text-gray-800 hover:black w-full cursor-pointer hover:bg-zinc-200 rounded' onClick={() => setCollapsed()}>
          <div className='flex items-center space-x-2 truncate'>
            <i className={data.isCollapsed ? "ri-folder-fill text-blue-500" : "ri-folder-4-line text-blue-500"}></i>
            <span>{data.name}</span> 
          </div>
          {isHovered ?  
            <div className='flex items-center text-gray-600 space-x-1.5 px-1'>
              <i className="ri-pencil-line hover:text-blue-500" onClick={(e) => { e.stopPropagation(); setEditMode(true)}}></i>
              <i className="ri-file-add-line hover:text-blue-500" onClick={addFile}></i>
            </div>
          : null}
        </div>
      }

      {data.isCollapsed ? null :
        <div className='pl-3 w-full'>
          {files?.map((file, index) => (
            <File key={index} data={file} />
          ))}
        </div> 
      }
    </div>
  )
}

export default Folder
