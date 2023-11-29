import React, {useEffect, useRef} from 'react';
import UploadSvg from '../../shared/images/file-upload.svg'
import cls from './Dropzone.module.css'

enum CSVSeparator {
    SEMICOLON = 'semicolon',
    COMMA = 'comma'
}

interface IRegexParser {
    regValid: RegExp,
    regValue: RegExp,
}

// New parser can be easily added by changing every comma in comma regex with the separator of choice
const Parsers: Record<CSVSeparator, IRegexParser> = {
    [CSVSeparator.COMMA]: {
        regValid: /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/,
        regValue: /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g,
    },
    [CSVSeparator.SEMICOLON]: {
        regValid: /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^;'"\s\\]*(?:\s+[^;'"\s\\]+)*)\s*(?:;\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^;'"\s\\]*(?:\s+[^;'"\s\\]+)*)\s*)*$/,
        regValue: /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^;'"\s\\]*(?:\s+[^;'"\s\\]+)*))\s*(?:;|$)/g,
    },
}

function ab2str(buf: ArrayBuffer) {
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

function CSVtoArray(text: string) {
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

export const DropzoneCsv = () => {
    const [isDragActive, setIsDragActive] = React.useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

    }, []);

    // handle drag events
    const handleDrag = function(e: React.DragEvent<HTMLDivElement | HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFile = (file: File) => {
        let fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);

        function receivedText() {
            let result:string
            if (fr.result) {
                // convert to string
                if(typeof fr.result !== 'string') {
                    result = ab2str(fr.result)
                } else {
                    result = fr.result
                }
                // turn string to 2d array
                let data = CSVtoArray(result)
            }
        }
    }

    // triggers when file is selected
    const handleChange = function(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current?.click();
    };

    return (
        <form
            className={cls.form}
            onDragEnter={handleDrag}
            onSubmit={(e) => e.preventDefault()}
        >
            <input
                id="input-file-upload"
                ref={inputRef} type="file"
                className={`${cls.input}`}
                multiple={false}
                onChange={handleChange}
            />
            <label className={`${cls.label} ${isDragActive ? cls.dragActive : ""}`} htmlFor="input-file-upload">
                <UploadSvg/>
                <button className={cls.uploadButton} onClick={onButtonClick}>Загрузите файл</button>
            </label>
            { isDragActive && <div
                className={cls.dragFile}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            />}
        </form>
    );
};

