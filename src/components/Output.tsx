import React from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import { db } from '~data/db';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import Spinner from './ui/Spinner';
import { parseForGrid } from '~utils/parse-for-grid';

function Output() {
  const file = useLiveQuery(() => db.files.where({ focused: 1 }).first());

  function clearOutput() {
    db.files.update(file, {
      output: null,
      error: null,
      duration: null
    })
  }

  if(!file) return <EmptyStateOutput />

  return (
    <div className='h-full border-t border-zinc-200 bg-zinc-100'> 
      <OutputToolbar file={file} />
      <OutputZone file={file} />
    </div>
  )
}

function OutputToolbar({ file }) {

  const statusColor = () => {
    if (file?.status == 200) return "bg-green-700"
    return "bg-red-700" 
  }

  return (
    <div className='flex items-center space-x-2 border-b p-2 border-zinc-300'>
      {file.isLoading ?
        <Spinner />
        :
        <div className={`text-xs px-2 py-1 rounded text-white font-medium ${statusColor()}`}>
          {file?.status} {file?.statusMessage}
        </div>
      }
      <div className='font-medium text-zinc-700'>Results</div>

      {file.duration &&
        <div className='font-medium text-zinc-700 bg-zinc-200 px-2 py-1 rounded'>
          {file.duration}
        </div>
      }
    </div>
  )
}

function OutputZone({ file }) {

  if(file.isLoading) return null

  if(file.errorMessage) {
    return (
      <div className='h-full p-2'>
        <div className='p-4 mt-2 bg-zinc-200 font-medium text-zinc-800 rounded whitespace-pre-line'>{file.errorMessage}</div>
      </div>
    )
  } 

  const {columns, rows} = parseForGrid(file.output)

  return (
    <div className='flex flex-col h-full'>
      <DataGrid 
        className='flex-1 text-xs bg-zinc-100 pb-12'
        columns={columns} 
        rows={rows} 
        resizable={true}
      />
    </div>
  )
}

function EmptyStateOutput() {
  return (
    <div className='h-full border-t border-zinc-200 bg-zinc-100'> 
      <div className='p-2 h-full'>
        <div className='flex items-center space-x-2'>
        <div className='flex items-center space-x-1 text-xs px-2 py-1 rounded bg-zinc-200 text-zinc-200 font-medium'>
          status
        </div>
          <div className='font-medium text-zinc-700'>Results</div>
        </div>

        <div className='flex items-center justify-center h-full text-center'>
          <div className='text-zinc-500'>
            <i className="ri-rainbow-line text-4xl"></i>
            <div>The results of your query will appear here.</div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Output
