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
        code: value
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
  }, [container, view, file]);

  useEffect(() => {
    if(view) {
      view.destroy()
      setView(undefined)
    }
  }, [file?.id]);

  function onChange(e) {
    const value = e.state.doc.toString();
    debounced(value);
  }

  async function query() {
    try {
    const res = await fetch('https://dbpedia.org/sparql', {
        method: 'POST',
        body: file.code,
        headers: {
          'Accept': 'application/sparql-results+json,*/*;q=0.9',
          'Content-Type': 'application/sparql-query'
        }
      })

      const output = await res.json();

      db.files.update(file, {
        output: output.results.bindings
      })
    } catch(err)  {
      console.dir(err)
    }
  }

  return (
    <div ref={container} className="text-lg relative">
      <div className='absolute top-0 right-0 flex items-center space-x-2 mr-6 mt-4 z-50'>
        <button onClick={query} className='text-green-500 bg-white rounded h-12 w-12 flex items-center justify-center border border-green-700'>
          <i className="ri-play-mini-line text-3xl leading-none"></i>
        </button>
        <CopyToClipboard text={file?.code}>
          <button className='text-zinc-600 bg-white rounded h-12 w-12 flex items-center justify-center border border-zinc-600'>
            <i className="ri-clipboard-line text-xl leading-none"></i>
          </button>
        </CopyToClipboard>
      </div>
    </div>
  )
}

export default Editor