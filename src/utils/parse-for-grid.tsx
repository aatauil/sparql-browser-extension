import CustomCell from "~components/ui/CustomCell"
import { prefixes } from "~data/prefixes"

function limitResultLength(result, limit) {
  console.log(result.length)
  if (result.length > limit) {
    return result.slice(0, limit)
  } else {
    return result
  }
}

export function parseForGrid(data) {
  /** Case for empty results */
  if (!data) {
    return {
      columns: [],
      rows: []
    }
  }

  /** Case for ASK Queryies */
  if ("boolean" in data) {
    return {
      columns: [{ field: "ASK" }],
      rows: [{ ASK: data.boolean }]
    }
  }

  const obj = {
    columns: [],
    rows: []
  }

  obj.columns.push({
    field: "ID",
    resizable: false,
    sortable: true,
    pinned: "left",
    width: "60px"
  })

  const variables = data.head.vars
  const results = limitResultLength(data.results?.bindings, 500)

  variables.forEach((element) => {
    obj.columns.push({
      field: element,
      resizable: true,
      sortable: true,
      cellRenderer: CustomCell
    })
  })

  obj.rows = results.map((row, index) => {
    const newRow = {
      ID: index + 1
    }

    for (let key in row) {
      let shortened

      if (row[key]?.type == "uri") {
        const value = row[key].value

        for (const [long, short] of Object.entries(prefixes)) {
          if (value.indexOf(long) != -1) {
            shortened = value.replace(long, `${short}:`)
            break
          }
        }
      }

      newRow[key] = {
        uri: row[key]?.value,
        shortened: shortened
      }
    }

    return newRow
  })

  return obj
}
