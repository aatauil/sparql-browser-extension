import React, { useState } from "react"
import { db } from "../data/db"
import { useLiveQuery } from "dexie-react-hooks"
import Select from "react-select"
import { formatDuration } from "../utils/formatDuration"

function Toolbar() {
  const [editingEndpoint, setEditingEndpoint] = useState(false)

  const file = useLiveQuery(() => db.files.where({ focused: 1 }).first())
  const database = useLiveQuery(
    () => db.databases.where({ id: file?.databaseId || -1 }).first(),
    [file]
  )
  const endpoints = useLiveQuery(() => db.endpoints.toArray())
  const selectedEndpoint = useLiveQuery(() =>
    db.endpoints.where({ focused: 1 }).first()
  )

  async function query() {
    const endpoint = selectedEndpoint
      ? selectedEndpoint.value
      : "https://dbpedia.org/sparql"

    db.files.update(file, {
      isLoading: true,
      status: null,
      statusMessage: null,
      errorMessage: null,
      output: null,
      duration: null
    })

    try {
      const start = performance.now()

      const res = await fetch(endpoint, {
        method: "POST",
        body: `query=${encodeURIComponent(file.code)}`,
        headers: {
          Accept: "application/sparql-results+json,*/*;q=0.9",
          "Content-Type": "application/x-www-form-urlencoded	"
        }
      })

      if (res.ok == false) {
        const end = performance.now()
        const duration = formatDuration(end - start)

        const errorMessage = await res.text()

        db.files.update(file, {
          status: res.status,
          statusMessage: res.statusText,
          errorMessage: errorMessage,
          isLoading: false,
          duration: duration
        })

        return
      }

      const output = await res.json()

      const end = performance.now()
      const duration = formatDuration(end - start)

      db.files.update(file, {
        status: res.status,
        statusMessage: res.statusText,
        output: output,
        isLoading: false,
        duration: duration
      })
    } catch (err) {
      db.files.update(file, {
        errorMessage: err.stack,
        statusMessage: err.message,
        isLoading: false
      })
    }
  }

  function isFavorite() {
    if (file.favorite == 1) {
      return "ri-star-fill text-yellow-400"
    } else {
      return "ri-star-line text-gray-400"
    }
  }

  function toggleFavorite() {
    db.files.update(file, {
      favorite: file.favorite == 1 ? 0 : 1
    })
  }

  function setEndpoint(endpoint) {
    db.endpoints.where("focused").equals(1).modify({ focused: 0 })
    db.endpoints.update(endpoint.id, { focused: 1 })
  }

  if (!file) return null

  return (
    <div className="flex w-full items-center justify-between p-4">
      <div className="flex-1 space-y-2">
        <div className="flex items-center space-x-2">
          <button className="bg-gray-100 px-2 py-1 rounded hover:bg-yellow-100" onClick={() => toggleFavorite()}>
            <i className={`text-xl ${isFavorite()}`}></i>
          </button>
          <span className="text-xl font-medium">{file.name}</span>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-end space-x-2">

          <div className="flex h-auto items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Select
                className="w-60"
                name="endpoint"
                options={endpoints}
                placeholder="Select endpoint..."
                value={selectedEndpoint}
                onChange={setEndpoint}
              />
              <button
                onClick={() => setEditingEndpoint(true)}
                className="flex h-full items-center rounded border border-gray-400 bg-gray-200 px-2 py-2 hover:bg-gray-300">
                <i className="ri-database-2-line text-base leading-none text-gray-800"></i>
              </button>
            </div>
            <div className="mx-8 w-.5 h-8 border border-gray-200"></div>
            <button
              onClick={query}
              className="flex items-center space-x-2 rounded border border-green-900 bg-green-700 px-2 py-1.5 pr-6 text-sm text-white hover:bg-green-800">
              <i className="ri-play-line text-lg leading-none"></i>
              <div className="font-medium">Run</div>
            </button>
          </div>
        </div>

      </div>
      {editingEndpoint && (
        <EndpointModal
          setEditingEndpoint={setEditingEndpoint}
          endpoints={endpoints}
        />
      )}
    </div>
  )
}

function EndpointModal({ setEditingEndpoint, endpoints }) {
  const [label, setLabel] = useState("")
  const [value, setValue] = useState("")

  function createEndpoint() {
    db.endpoints.add({
      label,
      value
    })

    setLabel("")
    setValue("")
  }

  function deleteEndpoint(id) {
    db.endpoints.where({ id: id }).delete()
  }

  return (
    <div className="relative z-50" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div
        className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
            <div className="bg-white">
              <div className="flex items-center space-x-3 border-b border-gray-300 p-4">
                <h3
                  className="font-base flex-1 text-lg leading-6 text-gray-900"
                  id="modal-title">
                  Manage endpoints
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingEndpoint(false)}
                  className="flex h-full items-center rounded bg-gray-200 px-3 py-2 hover:bg-gray-300">
                  <i className="ri-close-line"></i>
                </button>
              </div>
              <div className="pb-4">
                <table className="min-w-full divide-y divide-gray-300 text-xs">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left font-medium tracking-wide text-gray-600">
                        Label
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left font-medium tracking-wide text-gray-600">
                        Value
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left font-medium tracking-wide text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-gray-700">
                      <td className="whitespace-nowrap px-4 py-2">dbpedia</td>
                      <td className="whitespace-nowrap px-4 py-2">
                        https://dbpedia.org/sparql
                      </td>
                      <td className="flex justify-end whitespace-nowrap px-4 py-2">
                        <span className="rounded-full border text-[11px] border-gray-300 bg-gray-200 px-3 py-1">
                          default
                        </span>
                      </td>
                    </tr>
                    {endpoints.map((endpoint, index) => {
                      return (
                        <tr key={index} className="text-gray-700">
                          <td className="whitespace-nowrap px-4 py-2">
                            {endpoint.label}
                          </td>
                          <td className="whitespace-nowrap px-3 py-2">
                            {endpoint.value}
                          </td>
                          <td className="flex justify-end whitespace-nowrap px-3 py-2">
                            <button onClick={() => deleteEndpoint(endpoint.id)}>
                              <i className="ri-delete-bin-2-line text-right text-lg leading-none text-gray-700 hover:text-red-700"></i>
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-gray-300 bg-gray-50 p-4">
                <div className="flex items-center space-x-2">
                  <div className="relative w-1/5">
                    <input
                      id="small_outlined"
                      type="text"
                      className="border-1 peer block w-full appearance-none rounded border-gray-300 bg-white px-2.5 pb-1.5 pt-3 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                      placeholder=" "
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                    />
                    <label
                      for="small_outlined"
                      className="absolute top-1 left-1 z-10 origin-[0] -translate-y-3 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
                      Label
                    </label>
                  </div>
                  <div className="relative flex-1">
                    <input
                      id="small_outlined"
                      type="text"
                      className="border-1 peer block w-full appearance-none rounded border-gray-300 bg-white px-2.5 pb-1.5 pt-3 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 "
                      placeholder=" "
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                    <label
                      for="small_outlined"
                      className="absolute top-1 left-1 z-10 origin-[0] -translate-y-3 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
                      Value
                    </label>
                  </div>
                  <button
                    onClick={() => createEndpoint()}
                    className="border-1 flex items-center rounded border-blue-600 bg-blue-600 px-2 py-1 leading-none text-white hover:bg-blue-700">
                    <i className="ri-add-line text-base"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toolbar
