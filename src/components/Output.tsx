import React from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import { db } from '~data/db';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import { prefixes } from '~data/prefixes';
import Spinner from './ui/Spinner';

function Output() {

  const file = useLiveQuery(() => db.files.where({ focused: 1 }).first());

  if(!file?.output?.length) return <EmptyStateOutput />;

  const {columns, rows} = parseForGrid(file?.output)

  function clearOutput() {
    db.files.update(file, {
      output: null
    })
  }

  return (
    <div className='h-full border-t border-zinc-300 bg-zinc-100'> 
      <div className='flex items-center justify-between p-2'>
        <div className='flex items-center space-x-2'>
          <div className='flex items-center justify-center pl-1'>
            {
              file.error ? 
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              :
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            }
          </div>
          <div className='font-medium text-zinc-700'>Results</div>
          
            {
              file.isLoading ?
              <Spinner />
              :
              <div className='font-medium text-zinc-700 bg-zinc-200 px-2 py-1 rounded'>
                {file.duration}
              </div>
            }
          
        </div>

        <button onClick={clearOutput} className='text-zinc-800 font-medium px-4 py-1 rounded bg-zinc-300 hover:bg-zinc-200'>Clear output</button>
      </div>
      <div className='p-2'>
        <DataGrid 
          className='border border-zinc-300 text-xs rounded-lg'
          columns={columns} 
          rows={rows} 
          resizable={true}
        />
      </div>

    </div>

  )
}


function EmptyStateOutput() {
  return (
    <div className='h-full border-t border-zinc-200 bg-zinc-100'> 
      <div className='p-2 h-full'>
        <div className='flex items-center space-x-2'>
          <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full"></span>
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

const parseForGrid = function(data) {
  const bindingKeys = Object.keys(data[0])
  const obj = {
    columns: [],
    rows : []
  };

  obj.columns.push({
    key: "ID",
    name: "ID",
    resizable: true,
    frozen: true
  })

  bindingKeys.forEach(element => {
    obj.columns.push({
      key: element,
      name: element,
      resizable: true,
    })
  });

  obj.rows = data.map((row, index) => {
    const newRow = {
      ID: index + 1
    };

    bindingKeys.forEach((key) => {
      let shortened;

      if(row[key].type = 'uri') {
        const value = row[key].value

        for (const [long, short] of Object.entries(prefixes)) {
          if ( value.indexOf(long) != -1 ) {
            shortened = value.replace(long, `${short}:`)
            break;
          }
        }
      }

      newRow[key] = shortened || row[key].value
    })

    return newRow
  })

  return obj;
};

export default Output