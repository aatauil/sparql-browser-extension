import React, { useEffect, useRef, useState } from 'react';
import { SparqlEditor } from 'sparql-editor';
import { db } from '../data/db';
import { useDebouncedCallback } from 'use-debounce';
import { useLiveQuery } from "dexie-react-hooks";
import { CopyToClipboard } from 'react-copy-to-clipboard';

function Editor() {
  const container = useRef()
  const [view, setView] = useState()

  const file = useLiveQuery(() => db.files.where({ focused: 1 }).first());

  const debounced = useDebouncedCallback(
    (value) => {
      db.files.update(file.id , {
        code: value,
        modified: new Date()
      })
    },
    500
  );

  useEffect(() => {
    if(file && !view) {
      const viewCurrent = new SparqlEditor({
        parent: container.current,
        onChange: onChange,
        doc: file.code
      })

      setView(viewCurrent)
    }
  }, [container, view, file?.id]);

  useEffect(() => {
    if(view) {
      view.destroy()
      setView(undefined)
    }
  }, [file?.id]);

  function onChange(viewUpdate) {
    if (viewUpdate.docChanged) {
      const value = viewUpdate.state.doc.toString();
      debounced(value);
    }
  }

  if(!file) return (
    <div className='flex-1 flex items-center justify-center'>
    <div className='text-zinc-500 text-center'>
      <i className="ri-braces-line text-4xl"></i>
      <div>Open a file to start writing your query</div>
    </div>

  </div>

  )

  return (
    <div ref={container} className="text-base relative flex-1">
      <div className='absolute top-0 right-0 flex items-center space-x-2 mr-6 mt-4 z-10 shadow-md'>
        <CopyToClipboard text={file?.code}>
          <button className='text-zinc-600 bg-white rounded h-12 w-12 flex items-center justify-center border border-zinc-600 hover:bg-zinc-100'>
            <i className="ri-clipboard-line text-xl leading-none"></i>
          </button>
        </CopyToClipboard>
      </div>
    </div>
  )
}

export default Editor