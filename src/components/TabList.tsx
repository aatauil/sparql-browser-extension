import React from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import { db } from '~data/db';

function TabList() {

  const files = useLiveQuery(() => db.files.toArray());
  
  async function addFile() {
    const now = new Date().toISOString();
    db.files.where('focused').equals(1).modify({ focused: 0 });
    db.files.add({
      name: now,
      code: 'SELECT * WHERE { ?s ?p ?o } LIMIT 10',
      focused: 1,
      folderId: -1,
      created: now,
      modified: now
    });
  }

  function deleteFile(fileId) {
    db.files.delete(fileId);
  }

  function setFile(fileId) {
    db.files.where('focused').equals(1).modify({focused: 0});
    db.files.update(fileId, { focused: 1 });
  }

  function isFocused(value) {
    if(value) {
      return "text-black"
    } else {
      return "hover:bg-zinc-100";
    }
  }

  return (
    <div className='flex items-center w-full space-x-3'>
      <div className='flex flex-col text-gray-600 h-full w-full'>    
        <button className='bg-zinc-100 px-2 py-1 text-gray-800 rounded hover:bg-zinc-300 ml-2 mb-2 border-b' onClick={addFile}>
          <i className="ri-add-line"></i>
        </button>
        {files?.map((file, index) => (
          <div key={index} className={`flex items-center justify-between p-4 cursor-pointer text-base border-b ${isFocused(file?.focused)}`} >
            <div onClick={() => setFile(file.id)}>{file.name}</div>
            <button className='hover:text-red-500 rounded-full text-gray-700 flex items-center justify-center h-5 w-5 ' onClick={() => deleteFile(file.id)}>
              <i className="ri-close-line "></i>
            </button> 
          </div> 
        ))}
      </div>
    </div>
  )
}

export default TabList