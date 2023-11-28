import React, {ChangeEvent, DragEventHandler, useState} from 'react';
import UploadSvg from '../../shared/images/file-upload.svg'
import cls from './Dropzone.module.css'

export const DropzoneCsv = () => {
    const [isDragActive, setIsDragActive] = React.useState(false);
    const inputRef = React.useRef<any>(null);

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
            // handleFiles(e.dataTransfer.files);
            console.log(e.dataTransfer.files)
        }
    };

    // triggers when file is selected with click
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
            <label className={`${cls.label} ${isDragActive ? cls.dragActive : ""} `} htmlFor="input-file-upload">
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

