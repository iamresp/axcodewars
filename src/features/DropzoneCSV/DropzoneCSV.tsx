import React, {ChangeEvent, DragEventHandler, useEffect, useRef, useState} from 'react';
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

function CSVtoArray(text:any, separator: CSVSeparator) {
    // Return NULL if input string is not well formed CSV string.
    if (!Parsers[separator].regValid.test(text)) return null;
    console.log("not skipped")
    let a = [];                     // Initialize array to receive values.
    text.replace(Parsers[separator].regValue, // "Walk" the string using replace with callback.
        function(m0:string, m1:string, m2:string, m3:string) {
            // Remove backslash from \' in single quoted values.
            if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined) a.push(m3);
            return ''; // Return empty string.
        });
    // Handle special case of empty last value.
    if (/,\s*$/.test(text)) a.push('');
    console.log('a', a)
    return a;
};

export const DropzoneCsv = () => {
    const [isDragActive, setIsDragActive] = React.useState(false);
    const inputRef = React.useRef<any>(null);

    useEffect(() => {

    }, []);

    // handle drag events
    const handleDrag = function(e:any) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function(e:any) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
            console.log(e.dataTransfer.files)
        }
    };

    const handleFile = (file:any) => {
        let fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);

        function receivedText() {
            console.log( fr.result);
            let result:string
            if (fr.result) {
                // convert to string
                if(typeof fr.result !== 'string') {
                    result = ab2str(fr.result)
                } else {
                    result = fr.result
                }
                // turn string to 2d array
                let data : any = result.split(/\r\n|\r|\n/)
                if(data) {
                    console.log('inside')
                    for (let row = 0; row < data?.length; row++) {
                        data[row] = CSVtoArray(data[row], CSVSeparator.SEMICOLON)
                    }
                }
                console.log('data', data)
                console.log(CSVtoArray("'string, duppi, du', 23, lala", CSVSeparator.COMMA));
            }
        }
    }

    // triggers when file is selected
    const handleChange = function(e:any) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // handleFiles(e.target.files);
            console.log(e.target.files)
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <form
            className={`${cls.form}`}
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
                <button className={`${cls.uploadButton}`} onClick={onButtonClick}>Загрузите файл</button>
            </label>
            { isDragActive && <div
                className={`${cls.dragFile}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            />}
        </form>
    );
};

