import path from 'path';
import minimist from 'minimist';

// Setup SheetsJS library
import * as XLSX from 'xlsx/xlsx.mjs';

/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';
XLSX.set_fs(fs);

/* load the codepage support library for extended support with older formats  */
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
import { totalmem } from 'os';
XLSX.set_cptable(cpexcel);

class createCrossSectionJSON {
  constructor(xlsPath, saveFileName) {
    this.MidblockCrosswalk = null;
    this.totalMidblocks = 0;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    this.jsonObject = {
      metadata: {},
      cims: {},
      cic: {},
      nms: {},
      nc: {},
      cc: {},
    };

    this.xlsPath = xlsPath;
    this.saveFileName = saveFileName;
    //'../tests/2021-12-23_Cross section compatability table_40ft.xlsx';
    this.workbook = XLSX.readFile(this.xlsPath, { type: 'binary' });

    this.periodicSheet = this.workbook.SheetNames.filter(
      (f) => f == 'periodic'
    );
    this.balancedSheet = this.workbook.SheetNames.filter(
      (f) => f == 'balanced'
    );

    // midblock crosswalk?
    this.getMidBlockCrosswalk();
    //this.getFromBalancedSheet();

    // none, bike, transit, both //
    this.calculateFor('cims', 'none', 'C');
    this.calculateFor('cims', 'bike', 'D');
    this.calculateFor('cims', 'transit', 'E');
    this.calculateFor('cims', 'both', 'F');

    this.calculateFor('cic', 'none', 'G');
    this.calculateFor('cic', 'bike', 'H');
    this.calculateFor('cic', 'transit', 'I');
    this.calculateFor('cic', 'both', 'J');

    this.calculateFor('nms', 'none', 'K');
    this.calculateFor('nms', 'bike', 'L');
    this.calculateFor('nms', 'transit', 'M');
    this.calculateFor('nms', 'both', 'N');

    this.calculateFor('nc', 'none', 'O');
    this.calculateFor('nc', 'bike', 'P');
    this.calculateFor('nc', 'transit', 'Q');
    this.calculateFor('nc', 'both', 'R');

    this.calculateFor('cc', 'none', 'S');
    this.calculateFor('cc', 'bike', 'T');
    this.calculateFor('cc', 'transit', 'U');
    this.calculateFor('cc', 'both', 'V');
  }

  saveResults() {
    fs.writeFile(this.saveFileName, this.getFullJson(), 'utf8', (err) => {
      if (err) console.log(err);
      else {
        console.log(`File written successfully to: ${this.saveFileName}\n`);
      }
    });
  }

  /* Get midblock crosswalk and determine total number of midblocks */
  getMidBlockCrosswalk() {
    var MidblockKeys = [];
    var MidblockCrosswalk = [];

    // loop through the periodic tab starting just below 'Midblock'
    for (var i = 3; i < 100; i++) {
      if (this.workbook.Sheets[this.periodicSheet][`A${i}`] != null) {
        this.totalMidblocks++;
      } else {
        //console.log(`totalMidblocks is ${this.totalMidblocks}`);
        break;
      }
    }

    //console.log('Number of midblocks:', this.totalMidblocks);

    // get the keys to fill out the array
    // start at 1 because 0 is just 'Midblock'
    for (let i = 1; i < this.alphabet.length; i++) {
      if (
        this.workbook.Sheets[this.periodicSheet][
          `${this.alphabet.charAt(i)}2`
        ] != null
      ) {
        /*console.log(
          `${this.alphabet.charAt(i)}:`,
          this.workbook.Sheets[this.periodicSheet][
            this.alphabet.charAt(i) + '2'
          ].v
        );*/
        MidblockKeys[this.alphabet.charAt(i)] =
          this.workbook.Sheets[this.periodicSheet][
            `${this.alphabet.charAt(i)}2`
          ].v;
      } else {
        break;
      }
    }
    //console.log('Cross Section Keys: ', MidblockKeys);

    for (let i = 3; i < this.totalMidblocks + 3; i++) {
      /*console.log(
        'getMidblockCrosswalk for: ',
        this.workbook.Sheets[this.periodicSheet][`A${i}`].v
      );*/

      for (let key in MidblockKeys) {
        //console.log(`on ${i} loop`);

        // setup array to store crosswalk //
        if (
          MidblockCrosswalk[
            this.workbook.Sheets[this.periodicSheet][`A${i}`].v
          ] == null
        ) {
          MidblockCrosswalk[
            this.workbook.Sheets[this.periodicSheet][`A${i}`].v
          ] = [];
        }

        if (this.workbook.Sheets[this.periodicSheet][key + i] != null) {
          //sconsole.log('  >> key not null', MidblockKeys[key]);
          MidblockCrosswalk[
            this.workbook.Sheets[this.periodicSheet][`A${i}`].v
          ].push(MidblockKeys[key]);
        }
      }
    }

    this.MidblockCrosswalk = MidblockCrosswalk;
    //console.log('setting CrossSectionCrosswalk:', this.CrossSectionCrosswalk);
  }

  /*getFromBalancedSheet() {
    // figure out total number //
    this.totalMidblocks = 0;
    for (let i = 2; i < 10; i++) {
      if (this.workbook.Sheets[this.balancedSheet][`B${i}`] != null) {
        this.totalMidblocks++;
      } else {
        break;
      }
    }
    console.log('Total Midblocks:', this.totalMidblocks);
  }*/

  calculateFor(first, second, excelColumn) {
    /*console.log(
      `Calculating for: ${first} ${second} ${excelColumn}, totalMidblocks: ${this.totalMidblocks}`
    );*/

    for (let i = 2; i < this.totalMidblocks + 2; i++) {
      // Replace from lookup if there is any value at all //
      if (
        this.workbook.Sheets[this.balancedSheet][`${excelColumn}${i}`] != null
      ) {
        if (this.jsonObject[first][second] == null) {
          this.jsonObject[first][second] = new Object();
        }

        // labels are on the B column
        let label = this.workbook.Sheets[this.balancedSheet][`B${i}`]?.v;

        /*console.log(
          `${excelColumn}${i} has value`,
          this.workbook.Sheets[this.balancedSheet][`B${i}`]?.v
        );*/

        /*console.log(
          `  >> setting: ${first} ${second} ${label} (${this.MidblockCrosswalk[label]})`,
          this.MidblockCrosswalk[label]
        );*/

        this.jsonObject[first][second][label] = this.MidblockCrosswalk[label];
      }
    }
  }

  getFullJson() {
    return JSON.stringify(this.jsonObject, null, 2);
  }
}

// parse args: pass with two dashes: e.g. -convertFrom="../test/foo.xlsx"
const args = minimist(process.argv.slice(2));

if (args.convertFrom && args.exportTo) {
  console.log(`${args.convertFrom} ${args.exportTo}`);
  const convertMe = new createCrossSectionJSON(args.convertFrom, args.exportTo);
  convertMe.saveResults();
} else {
  console.log('Please pass excelFile and jsonExport');
}

// node .\generateCrossSectionJSON.mjs --convertFrom="../tests/2021-12-23_Cross section compatability table_40ft.xlsx" --exportTo="../tests/40.json"
// node .\generateCrossSectionJSON.mjs --convertFrom="../tests/2021-12-23_Cross section compatability table_44ft.xlsx" --exportTo="../tests/44.json"
// node .\generateCrossSectionJSON.mjs --convertFrom="../tests/2021-12-23_Cross section compatability table_50ft.xlsx" --exportTo="../tests/50.json"
// node .\generateCrossSectionJSON.mjs --convertFrom="../tests/2021-12-23_Cross section compatability table_56ft.xlsx" --exportTo="../tests/56.json"
// node .\generateCrossSectionJSON.mjs --convertFrom="../tests/2021-12-23_Cross section compatability table_60ft.xlsx" --exportTo="../src/composables/cross-section/60.json"
// node .\generateCrossSectionJSON.mjs --convertFrom="../tests/2021-12-23_Cross section compatability table_66ft.xlsx" --exportTo="../tests/66.json"
// node .\generateCrossSectionJSON.mjs --convertFrom="../tests/2021-12-23_Cross section compatability table_76ft.xlsx" --exportTo="../src/composables/cross-section/76.json"
