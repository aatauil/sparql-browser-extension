import { prefixes } from '~data/prefixes';

export function parseForGrid(data) {
  const obj = {
    columns: [],
    rows : []
  };

  if (!data) {
    return obj;
  }

  const variables = data.head.vars
  const results = data.results.bindings

  obj.columns.push({
    key: "ID",
    name: "ID",
    resizable: true,
    frozen: true
  })

  variables.forEach(element => {
    obj.columns.push({
      key: element,
      name: element,
      resizable: true,
    })
  });

  obj.rows = results.map((row, index) => {
    const newRow = {
      ID: index + 1
    };

    variables.forEach((key) => {
      let shortened;

      if(row[key]?.type == 'uri') {
        const value = row[key].value

        for (const [long, short] of Object.entries(prefixes)) {
          if ( value.indexOf(long) != -1 ) {
            shortened = value.replace(long, `${short}:`)
            break;
          }
        }
      }

      newRow[key] = shortened || row[key]?.value
    })

    return newRow
  })

  return obj;
};