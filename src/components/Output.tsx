import React from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import { db } from '~data/db';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

function Output() {

  const file = useLiveQuery(() => db.files.where({ focused: 1 }).first());
  if(!file?.output) return <EmptyStateOutput />;
  const {columns, rows} = parseForGrid(file?.output)



  return (
    <DataGrid 
      columns={columns} 
      rows={rows} 
      resizable={true}
    />
  )
}


function EmptyStateOutput() {
  return (
    <div className='h-full w-full bg-zinc-400'>

    </div>
  )
}

const parseForGrid = function(data) {
  const bindingKeys = Object.keys(data[0])
  const obj = {
    columns: [],
    rows : []
  };

  bindingKeys.forEach(element => {
    obj.columns.push({
      key: element,
      name: element,
      resizable: true,
    })
  });

  obj.rows = data.map(row => {
    const newRow = {};
    
    bindingKeys.forEach((key) => {
      newRow[key] = row[key].value
    })

    return newRow
  })
  
  return obj;
};

export default Output