import React, { useEffect, useRef, useState } from "react";
import { createSparqlEditor } from "sparql-editor";
import { db } from "../data/db";
import { useDebouncedCallback } from "use-debounce";
import { useLiveQuery } from "dexie-react-hooks";

function Editor() {
  const container = useRef(null);
  const [view, setView] = useState(null);

  const file = useLiveQuery(() => db.files.where({ focused: 1 }).first());

  const debouncedUpdate = useDebouncedCallback((value) => {
    if (file) {
      db.files.update(file.id, {
        code: value,
        modified: new Date()
      });
    }
  }, 500);

  useEffect(() => {
    if (file && !view) {
      const viewCurrent = createSparqlEditor({
        parent: container.current,
        onChange: handleChange,
        value: file.code
      });

      setView(viewCurrent);
    }
  }, [file, view]);

  useEffect(() => {
    if (view) {
      view.destroy();
      setView(null);
    }
  }, [file?.id]);

  function handleChange(value) {
    debouncedUpdate(value);
  }

  if (!file) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center text-gray-500">
          <i className="ri-braces-line text-4xl"></i>
          <div>Open a file to start writing your query</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={container} className="relative h-full pb-24 text-base"></div>
  );
}

export default Editor;
