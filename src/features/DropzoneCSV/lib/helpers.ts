import {CSVSeparator} from "./types";
import {Parsers} from "../model/parsers";

export function ab2str(buf: ArrayBuffer) {
    return String.fromCharCode.apply(null, Array.from(new Uint16Array(buf)));
}

const isValidCSVrow = (row: string[]) => row.length > 4 && row.length % 2 === 0


function parseCSVstring(str: string, separator: CSVSeparator): string[]  {
    // Return empty array if input string is not well formed CSV string.
    if (!Parsers[separator].regValid.test(str)) return []
    let a = [];                     // Initialize array to receive values.
    str.replace(Parsers[separator].regValue, // "Walk" the string using replace with callback.
        function(m0:string, m1:string, m2:string, m3:string) {
            // Remove backslash from \' in single quoted values.
            if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined) a.push(m3);
            return ''; // Return empty string.
        });
    // Handle special case of empty last value.
    if (/,\s*$/.test(str)) a.push('');
    return a;
}

function getAllSeparators(): Array<CSVSeparator> {
    const separatorsArr: Array<CSVSeparator> = []
    Object.values(CSVSeparator).forEach((separator) => {
        if (isNaN(Number(separator))) {
            separatorsArr.push(separator)
        }
    })
    return separatorsArr
}

export function CSVtoArray(text: string) {
    // split CSV table to array of rows
    let CSVData: string[] = text.split(/\r\n|\r|\n/)
    // go through all separators
    for (const separator of getAllSeparators()) {
        // store parsed CSV
        let currentData: string[][] = new Array(CSVData.length).fill([]);

        // parse every row of CSV
        for (let row = 0; row < CSVData?.length; row++) {
            currentData[row] = parseCSVstring(CSVData[row], separator as CSVSeparator)
        }

        // remove last subarray if empty
        if(currentData.length && currentData[currentData.length - 1].length === 0) {
            currentData.pop()
        }

        // validation: go through array and check if all subarrays length more than 4 and divides by 2
        if(currentData.every(isValidCSVrow)) return currentData
    }

    return []
}