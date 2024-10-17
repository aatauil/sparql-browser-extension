import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "~data/db";
import { AgGridReact } from "ag-grid-react";
import Spinner from "./ui/Spinner";
import { parseForGrid } from "~utils/parse-for-grid";

function Output() {
  const file = useLiveQuery(() => db.files.where({ focused: 1 }).first());

  if (!file) return <EmptyStateOutput />;

  return (
    <div className="h-full border-t border-gray-200 bg-gray-100 pb-12">
      <OutputToolbar file={file} />
      <div className="relative h-full">
        <OutputZone file={file} />
      </div>
    </div>
  );
}

function OutputToolbar({ file }) {
  const statusColor = () => {
    if (file?.status == 200)
      return "bg-green-700 text-white font-medium border-green-900";
    return "bg-red-700 border-red-900";
  };

  return (
    <div className="flex items-center space-x-2 p-2">
      {file.isLoading ? (
        <Spinner />
      ) : (
        <div
          className={`rounded border border-gray-400 px-2 py-1 text-[11px] font-medium text-white ${statusColor()}`}>
          {file?.status} {file?.statusMessage}
        </div>
      )}

      {file.duration && (
        <div className="rounded border border-gray-400 bg-white px-2 py-1 text-[11px] font-medium text-gray-700">
          {file.duration}
        </div>
      )}
    </div>
  );
}

function OutputZone({ file }) {
  if (file.isLoading) return null;

  if (file.errorMessage) {
    return (
      <div className="h-full p-2">
        <div className="mt-2 whitespace-pre-line rounded bg-gray-200 p-4 font-medium text-gray-800">
          {file.errorMessage}
        </div>
      </div>
    );
  }

  const { columns, rows } = parseForGrid(file.output);

  return (
    <div className="ag-theme-balham flex h-full flex-col">
      <AgGridReact
        rowData={rows}
        columnDefs={columns}
        enableCellTextSelection={true}
        onGridReady={(e) => e.columnApi.autoSizeAllColumns()}></AgGridReact>
    </div>
  );
}

function EmptyStateOutput() {
  return (
    <div className="h-full border-t border-gray-200 bg-gray-100">
      <div className="h-full p-2">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-200">
            status
          </div>
          <div className="font-medium text-gray-700">Results</div>
        </div>

        <div className="flex h-full items-center justify-center text-center">
          <div className="text-gray-500">
            <i className="ri-rainbow-line text-4xl"></i>
            <div>The results of your query will appear here.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Output;
