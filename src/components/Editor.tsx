import React, { useEffect, useRef, useState } from "react"
import { createSparqlEditor } from "sparql-editor"
import { db } from "../data/db"
import { useDebouncedCallback } from "use-debounce"
import { useLiveQuery } from "dexie-react-hooks"

function Editor() {
  const container = useRef()
  const [view, setView] = useState()

  const file = useLiveQuery(() => db.files.where({ focused: 1 }).first())

  const debounced = useDebouncedCallback((value) => {
    db.files.update(file.id, {
      code: value,
      modified: new Date()
    })
  }, 500)

  useEffect(() => {
    if (file && !view) {
      const viewCurrent = createSparqlEditor({
        parent: container.current,
        onChange: onChange,
        value: file.code
      })

      setView(viewCurrent)
    }
  }, [container, view, file?.id])

  useEffect(() => {
    if (view) {
      view.destroy()
      setView(undefined)
    }
  }, [file?.id])

  function onChange(value, viewUpdate) {
    debounced(value)
  }

  if (!file)
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center text-zinc-500">
          <i className="ri-braces-line text-4xl"></i>
          <div>Open a file to start writing your query</div>
        </div>
      </div>
    )

  return <div ref={container} className="relative h-full pb-24 text-base"></div>
}

export default Editor
