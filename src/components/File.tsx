import React, { useState } from 'react';
import { db } from '~data/db';
import { useHover } from '~hooks/useHover';
import { useDrag } from 'react-dnd'

function File({data}) {
  const [hoverRef, isHovered] = useHover();
  const [editMode, setEditMode] = useState(false);
  const [localName, setlocalName] = useState(data.name)

  function setSelected(fileId) {
    db.files.where('focused').equals(1).modify({ focused: 0 });
    db.files.update(fileId, {
      focused: 1
    })
  }

  function handleDoubleClick() {
    console.log("double")
  }

  function deleteFile() {
    db.files.delete(data.id);
  }

  function updateFileName() {
    if(!localName) return;

    db.files.update(data.id, {
      name: localName
    });
    setEditMode(false)
  }

  if(editMode) return (
    <div>
      <div className='flex justify-between items-center space-x-1 p-2 text-gray-800 hover:black w-full cursor-pointer hover:bg-zinc-200 rounded' > 
        <div className='flex flex-1 items-center space-x-2'>
          <i className="ri-file-2-line text-blue-500"></i>
          <input autoFocus type="text" name="file-name" value={localName} onChange={(e) => setlocalName(e.target.value)} className='text-sm bg-white border border-gray-400 w-full p-1'/>
        </div>
        <div className='flex items-center text-sm text-gray-600 space-x-1.5 px-1'>
            <i className="ri-check-line hover:text-green-500" onClick={updateFileName}></i>
            <i className="ri-close-line hover:text-red-500" onClick={() => setEditMode(false)}></i>
          </div>
      </div>
    </div>
  )
  
  return (
    <div ref={hoverRef}>
      <button className='flex justify-between items-center space-x-1 p-2 text-gray-800 hover:black w-full cursor-pointer hover:bg-zinc-200 rounded' > 
        <div  className='flex flex-1 items-center space-x-2' onClick={() => setSelected(data.id)}>
          <i className="ri-file-2-line text-blue-500"></i>
          <span onDoubleClick={handleDoubleClick}>{data.name}</span> 
        </div>
        {isHovered ? 
          <div className='flex items-center text-sm text-gray-600 space-x-1.5 px-1'>
            <i className="ri-pencil-line hover:text-gray-200" onClick={() => setEditMode(true)}></i>
            <i className="ri-close-line hover:text-red-500" onClick={deleteFile}></i>
          </div>
        : null}
      </button>
    </div>
  )
}

export default File