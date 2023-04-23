import React, { useRef, useState } from 'react';
import { useLiveQuery } from "dexie-react-hooks";
import { db } from '~data/db';
import useOnClickOutside from '~hooks/useOnClickOutside';

function SbFiles() {
  const fileInput = useRef()

  const [isCreating, setIsCreating] = useState(false);
  const [fileName, setFileName] = useState("");

  const database = useLiveQuery(() => db.databases.where({ focused: 1 }).first());
  const files = useLiveQuery(() => db.files.where({ databaseId: database?.id || -1 }).toArray(), [database]);

  useOnClickOutside(fileInput, () => {
    setIsCreating(false)
  })

  if(!database) return null;

  async function addFile() {
    const now = new Date()

    const humanDate = now.toLocaleString("en-GB", {
      month: "long",
      day: "numeric",
    });

    const name = fileName?.length ? fileName : `untitled query - ${humanDate}`;

    db.files.where('focused').equals(1).modify({ focused: 0 });
    db.files.add({
      name: name,
      code: `SELECT * WHERE {
  ?s ?p ?o 
} LIMIT 10`,
      focused: 1,
      favorite: 0,
      created: now,
      databaseId: database.id,
      modified: now
    });
  }


  function isFocused(value) {
    if(value) {
      return "bg-blue-200 text-black"
    } else {
      return "hover:bg-zinc-100";
    }
  } 

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsCreating(false)
      setFileName("")
    }
    if (event.key === 'Enter') {
      addFile()
      setIsCreating(false)
      setFileName("")
    }
  };
  
  return (
    <div className='border-t border-neutral-400'>
      <div className='flex items-center justify-between pl-4 pr-3 py-2 bg-neutral-100'>
        <h2 className='text-xs font-medium text-zinc-700 uppercase'>Queries</h2> 
        <button className='bg-neutral-200 px-1 py-.5 text-zinc-600 text-md rounded hover:bg-zinc-300 hover:text-zinc-900'onClick={() => setIsCreating(true)}>
          <i className="ri-add-line text-sm"></i>
        </button>
      </div>
      <div className='p-2 space-y-px'>
        {isCreating &&
          <div ref={fileInput} className={`flex items-center space-x-1 cursor-pointer text-xs p-1 rounded`} >
            <i className="ri-file-list-2-line text-base"></i>
            <input autoFocus type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} onKeyDown={handleKeyDown} className='w-full p-1 pl-0 rounded border-none focus:ring-0 text-xs' placeholder='Untitled query'/>
          </div> 
        }
        {files?.map((file, index) => (
          <FileListItem 
            key={file.id}
            file={file} 
          />
        ))}
      </div>
    </div>
  )
}

function FileListItem({file}) {
  const fileInput = useRef()

  const [isEditing, setIsEditing] = useState(false);
  const [fileName, setFileName] = useState(file.name || "");

  useOnClickOutside(fileInput, () => {
    setIsEditing(false)
    setFileName(file.name)
  })

  function deleteFile(fileId) {
    db.files.delete(fileId);
  }

  function setFile(fileId) {
    db.files.where('focused').equals(1).modify({focused: 0});
    db.files.update(fileId, { focused: 1 });
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsEditing(false)
      setFileName(file.name)
    }
    if (event.key === 'Enter') {
      updateFileName()
      setIsEditing(false)
    }
  };

  function updateFileName() {
    const now = new Date()

    const humanDate = now.toLocaleString("en-GB", {
      month: "long",
      day: "numeric",
    });

    const name = fileName?.length ? fileName : `untitled query - ${humanDate}`;

    db.files.update(file.id , {
      name: name 
    })

    setFileName(name)
  }

  return (
    <>
      {isEditing ?
       <div ref={fileInput} onClick={() => setFile(file.id)} onDoubleClick={() => setIsEditing(true)} className={`flex items-center space-x-1 cursor-pointer text-xs p-1 rounded ${file.focused && "bg-zinc-100 font-medium text-zinc-800"}`} >
          <i className={`ri-file-list-2-line text-base ${file.focused && "text-blue-700"}`}></i>
          <input autoFocus type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} onKeyDown={handleKeyDown} className='w-full p-1 pl-0 rounded border-none focus:ring-0 text-xs' placeholder='Untitled query'/>
        </div> 
        :
        <div onClick={() => setFile(file.id)} onDoubleClick={() => setIsEditing(true)} className={`flex items-center space-x-1 cursor-pointer text-xs p-1 rounded hover:bg-zinc-100 hover:text-zinc-800 ${file.focused && "bg-zinc-100 font-medium text-zinc-800"}`} >
          <i className={`ri-file-list-2-line text-base ${file.focused && "text-blue-700"}`}></i>
          <div className='flex-1 text-ellipsis overflow-hidden whitespace-nowrap' >{file.name}</div>
          <button className='hover:text-red-500 rounded-full text-gray-700 flex items-center justify-center h-5 w-5' onClick={() => deleteFile(file.id)}>
            <i className="ri-close-line"></i>
          </button> 
        </div> 
      }
    </>
  )
}

export default SbFiles