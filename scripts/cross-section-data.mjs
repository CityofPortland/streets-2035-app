/**
 * # Generate cross-section datasets
 *
 * This script reads an Excel file of cross section mappings and generates
 * a JSON file based on the data in the Excel file
 *
 * ## Usage
 * From the project root directory:
 * ```
 * node scripts/cross-section-data.mjs --excel="[your excel path here]" --json="[json file to output]"
 * ```
 * Note the quotes around the path argument. They are necessary to prevent
 * shell expansion of glob patterns and allow spaces in paths
 */

import minimist from 'minimist';

// Setup SheetsJS library
import * as XLSX from 'xlsx/xlsx.mjs';

/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';
XLSX.set_fs(fs);

/* load the codepage support library for extended support with older formats  */
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
XLSX.set_cptable(cpexcel);

const args = minimist(process.argv.slice(2));

if (!args.excel || !args.json) {
  console.error('Must pass --excel=<excel input> and --json=<json output>');
  process.exit(1);
}

const workbook = XLSX.readFile(args.excel, { type: 'binary' });
const periodicSheet =
  workbook.Sheets[workbook.SheetNames.filter((f) => f == 'periodic')];
const balancedSheet =
  workbook.Sheets[workbook.SheetNames.filter((f) => f == 'balanced')];

const dataset = new Object();
const midblockMap = new Map();

function getColumnsAndRows(sheet) {
  const columns = new Set();
  const rows = new Set();

  for (const cell in sheet) {
    if (Object.hasOwnProperty.call(sheet, cell)) {
      if (cell.match(/[A-Z]+[0-9]+/)) {
        columns.add(cell[0]);
        rows.add(cell[1]);
      }
    }
  }

  return { columns: [...columns], rows: [...rows] };
}

function findCell(sheet, predicate) {
  for (const cell in sheet) {
    if (Object.hasOwnProperty.call(sheet, cell)) {
      if (cell.match(/[A-Z]+[0-9]+/) && sheet[cell]) {
        const { v } = sheet[cell];

        if (predicate(v)) {
          return cell;
        }
      }
    }
  }
}

// Process the periodic sheet to build map of midblock to periodic images
let { columns, rows } = getColumnsAndRows(periodicSheet);
let [midblockColumn, midblockRow] = findCell(
  periodicSheet,
  (v) => v.toLowerCase() === 'midblock'
);

// loop through midblock column below midblock row
//  to get the midblock keys
for (const row of rows.filter((r) => r > midblockRow)) {
  const key = periodicSheet[`${midblockColumn}${row}`].v;
  midblockMap.set(key, []);

  // then loop through the columns in that row and check for values
  for (const column of columns.filter((c) => c > midblockColumn)) {
    if (periodicSheet[`${column}${row}`]) {
      // if there is a value, check the header row for the value to add
      midblockMap.get(key).push(periodicSheet[`${column}${midblockRow}`].v);
    }
  }
}

// Process the balanced sheet to build dataset of classifications with
// midblock and periodic images
({ columns, rows } = getColumnsAndRows(balancedSheet));
[midblockColumn, midblockRow] = findCell(
  balancedSheet,
  (v) => v.trim().toLowerCase() === 'midblock'
);

const overwriteMap = new Map([
  ['cc', 'cic'],
  ['co', 'cc'],
  ['bike-transit', 'both'],
]);

// loop through midblock column below midblock row
//  to get the midblock keys
for (const row of rows.filter((r) => r > midblockRow)) {
  const midblock = balancedSheet[`${midblockColumn}${row}`].v;

  // then loop through the columns in that row and check for values
  for (const column of columns.filter((c) => c > midblockColumn)) {
    if (balancedSheet[`${column}${row}`]) {
      // if there is a value, check the header row for the value to add
      const header = balancedSheet[`${column}${midblockRow}`].v;
      // parse the header into parts to build the dataset
      const match = header.match(/([a-z]+)-?(.*)/);

      if (match) {
        const classification = overwriteMap.get(match[1]) || match[1];
        const profile = overwriteMap.get(match[2]) || match[2] || 'none';

        if (!dataset[classification]) dataset[classification] = new Object();
        if (!dataset[classification][profile])
          dataset[classification][profile] = new Object();

        dataset[classification][profile][midblock] = midblockMap.get(midblock);
      }
    }
  }
}

fs.writeFile(args.json, JSON.stringify(dataset, null, 2), 'utf8', (err) => {
  if (err) console.log(err);
  else {
    console.log(`File written successfully to '${args.json}'`);
  }
});
