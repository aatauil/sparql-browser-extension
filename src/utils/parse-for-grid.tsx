import CustomCell from "~components/ui/CustomCell";
import { prefixes } from "~data/prefixes";

/**
 * Limits the length of the result array to a specified limit.
 * @param {Array} result - The result array to limit.
 * @param {number} limit - The maximum length of the result array.
 * @returns {Array} - The limited result array.
 */
function limitResultLength(result, limit) {
  return result.length > limit ? result.slice(0, limit) : result;
}

/**
 * Parses the input data for grid representation.
 * @param {Object} data - The input data to parse.
 * @returns {Object} - An object containing columns and rows for the grid.
 */
export function parseForGrid(data) {
  if (!data) {
    return { columns: [], rows: [] };
  }

  if ("boolean" in data) {
    return { columns: [{ field: "ASK" }], rows: [{ ASK: data.boolean }] };
  }

  const columns = [
    {
      field: "ID",
      resizable: false,
      sortable: true,
      pinned: "left",
      width: "60px"
    },
    ...data.head.vars.map((variable) => ({
      field: variable,
      resizable: true,
      sortable: true,
      cellRenderer: CustomCell
    }))
  ];

  const results = limitResultLength(data.results?.bindings, 500);
  const rows = results.map((row, index) => {
    const newRow = { ID: index + 1 };

    Object.entries(row).forEach(([key, valueObj]) => {
      const value = valueObj?.value;
      let shortened;
      if (valueObj?.type === "uri") {
        for (const [long, short] of Object.entries(prefixes)) {
          if (value.includes(long)) {
            shortened = value.replace(long, `${short}:`);
            break; // Break early once a match is found
          }
        }
      }
      newRow[key] = { uri: value, shortened };
    });

    return newRow;
  });
  return { columns, rows };
}
