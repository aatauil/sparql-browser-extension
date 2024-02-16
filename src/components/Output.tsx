import React from "react"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "~data/db"
import { AgGridReact } from "ag-grid-react"
import Spinner from "./ui/Spinner"
import { parseForGrid } from "~utils/parse-for-grid"

function Output() {
  const file = useLiveQuery(() => db.files.where({ focused: 1 }).first())

  if (!file) return <EmptyStateOutput />

  return (
    <div className="h-full border-t border-zinc-200 bg-zinc-100 pb-12">
      <OutputToolbar file={file} />
      <div className="relative h-full">
        <OutputZone file={file} />
      </div>
    </div>
  )
}

function OutputToolbar({ file }) {
  const statusColor = () => {
    if (file?.status == 200) return "bg-green-700 text-white font-medium border-green-900"
    return "bg-red-700 border-red-900"
  }

  return (
    <div className="flex items-center space-x-2 border-b border-zinc-300 p-2">
      {file.isLoading ? (
        <Spinner />
      ) : (
        <div
          className={`rounded px-2 py-1 text-[11px] border border-zinc-400 font-medium text-white ${statusColor()}`}>
          {file?.status} {file?.statusMessage}
        </div>
      )}

      {file.duration && (
        <div className="rounded bg-white border border-zinc-400 text-[11px] px-2 py-1 font-medium text-zinc-700">
          {file.duration}
        </div>
      )}
    </div>
  )
}

function OutputZone({ file }) {
  if (file.isLoading) return null

  if (file.errorMessage) {
    return (
      <div className="h-full p-2">
        <div className="mt-2 whitespace-pre-line rounded bg-zinc-200 p-4 font-medium text-zinc-800">
          {file.errorMessage}
        </div>
      </div>
    )
  }

  const { columns, rows } = parseForGrid(file.output)

  return (
    <div className="ag-theme-balham flex h-full flex-col">
      <AgGridReact
        rowData={rows}
        columnDefs={columns}
        enableCellTextSelection={true}
        onGridReady={(e) => e.columnApi.autoSizeAllColumns()}></AgGridReact>
    </div>
  )
}

function EmptyStateOutput() {
  return (
    <div className="h-full border-t border-zinc-200 bg-zinc-100">
      <div className="h-full p-2">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 rounded bg-zinc-200 px-2 py-1 text-xs font-medium text-zinc-200">
            status
          </div>
          <div className="font-medium text-zinc-700">Results</div>
        </div>

        <div className="flex h-full items-center justify-center text-center">
          <div className="text-zinc-500">
            <i className="ri-rainbow-line text-4xl"></i>
            <div>The results of your query will appear here.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Output
