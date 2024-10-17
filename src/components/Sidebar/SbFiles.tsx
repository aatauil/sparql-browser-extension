import React, { useRef, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "~data/db";
import useOnClickOutside from "~hooks/useOnClickOutside";

function SbFiles() {
  const fileInput = useRef();

  const [isCreating, setIsCreating] = useState(false);
  const [fileName, setFileName] = useState("");

  const database = useLiveQuery(() =>
    db.databases.where({ focused: 1 }).first()
  );
  const files = useLiveQuery(
    () => db.files.where({ databaseId: database?.id || -1 }).toArray(),
    [database]
  );

  useOnClickOutside(fileInput, () => {
    setIsCreating(false);
  });

  if (!database) return null;

  async function addFile() {
    const now = new Date();

    const humanDate = now.toLocaleString("en-GB", {
      month: "long",
      day: "numeric"
    });

    const name = fileName?.length ? fileName : `untitled query - ${humanDate}`;

    db.files.where("focused").equals(1).modify({ focused: 0 });
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
    if (value) {
      return "bg-blue-200 text-black";
    } else {
      return "hover:bg-gray-100";
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsCreating(false);
      setFileName("");
    }
    if (event.key === "Enter") {
      addFile();
      setIsCreating(false);
      setFileName("");
    }
  };

  const isEmptyAndNotCreating = () => files?.length == 0 && isCreating == false;

  return (
    <div className="border-t border-gray-300">
      <div className="flex items-center justify-between space-x-1 bg-gray-200/50 py-2 pl-2 pr-3">
        <i className="ri-bubble-chart-line text-base text-gray-500"></i>
        <h2 className="flex-1 text-xs font-medium uppercase text-gray-900">
          Queries
        </h2>
        <button
          className="py-.5 text-md rounded px-1 text-black hover:bg-gray-300"
          onClick={() => setIsCreating(true)}>
          <i className="ri-add-line text-sm"></i>
        </button>
      </div>
      <div className="space-y-px p-2">
        {isCreating && (
          <div
            ref={fileInput}
            className="flex cursor-pointer items-center space-x-1 rounded border border-gray-500 bg-white p-1 text-xs">
            <i className="ri-file-list-2-line text-base"></i>
            <input
              autoFocus
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded border-none p-1 pl-0 text-xs focus:ring-0"
              placeholder="Untitled query"
            />
          </div>
        )}
        {files?.map((file, index) => (
          <FileListItem key={file.id} file={file} />
        ))}

        {isEmptyAndNotCreating() && (
          <div className="rounded px-1 py-2 text-center text-[10px] text-gray-400">
            start constructing your first query by clicking the plus button
          </div>
        )}
      </div>
    </div>
  );
}

function FileListItem({ file }) {
  const fileInput = useRef();

  const [isEditing, setIsEditing] = useState(false);
  const [fileName, setFileName] = useState(file.name || "");

  useOnClickOutside(fileInput, () => {
    setIsEditing(false);
    setFileName(file.name);
  });

  function deleteFile(fileId) {
    db.files.delete(fileId);
  }

  function setFile(fileId) {
    db.files.where("focused").equals(1).modify({ focused: 0 });
    db.files.update(fileId, { focused: 1 });
  }

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsEditing(false);
      setFileName(file.name);
    }
    if (event.key === "Enter") {
      updateFileName();
      setIsEditing(false);
    }
  };

  function updateFileName() {
    const now = new Date();

    const humanDate = now.toLocaleString("en-GB", {
      month: "long",
      day: "numeric"
    });

    const name = fileName?.length ? fileName : `untitled query - ${humanDate}`;

    db.files.update(file.id, {
      name: name
    });

    setFileName(name);
  }

  return (
    <>
      {isEditing ? (
        <div
          ref={fileInput}
          onClick={() => setFile(file.id)}
          onDoubleClick={() => setIsEditing(true)}
          className={`flex cursor-pointer items-center space-x-1 rounded border border-transparent p-1 text-xs ${file.focused && "border border-gray-600 bg-white text-black ring-2 ring-blue-600 ring-offset-2 hover:border-black"}`}>
          <i
            className={`ri-file-list-2-line text-base ${file.focused && "text-blue-700"}`}></i>
          <input
            autoFocus
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded border-none p-1 pl-0 text-xs focus:ring-0"
            placeholder="Untitled query"
          />
        </div>
      ) : (
        <div
          onClick={() => setFile(file.id)}
          onDoubleClick={() => setIsEditing(true)}
          className={`flex cursor-pointer items-center space-x-1 rounded border border-transparent p-1 text-xs hover:bg-gray-200 hover:text-gray-800 ${file.focused && "border-gray-600 bg-white text-black hover:border-black hover:bg-white"}`}>
          <i
            className={`ri-file-list-2-line text-base ${file.focused && "text-blue-700"}`}></i>
          <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {file.name}
          </div>
          <button
            className="flex h-5 w-5 items-center justify-center rounded-full text-gray-700 hover:bg-red-100 hover:text-red-600"
            onClick={() => deleteFile(file.id)}>
            <i className="ri-close-line"></i>
          </button>
        </div>
      )}
    </>
  );
}

export default SbFiles;
