import React, {
  type FC,
  useRef,
  type Dispatch,
  type SetStateAction
} from 'react'

import UploadSvg from 'shared/images/file-upload.svg'
import cls from './Dropzone.module.css'
import { arrBufToStr, CSVtoArray } from '../lib/helpers'

interface DropzoneCsvProps {
  data: string[][]
  setData: Dispatch<SetStateAction<string[][]>>
}

export const DropzoneCsv: FC<DropzoneCsvProps> = ({ data, setData }) => {
  const [isDragActive, setIsDragActive] = React.useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // handle drag events
  const handleDrag = function (
    e: React.DragEvent<HTMLDivElement | HTMLFormElement>
  ): void {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  // triggers when file is dropped
  const handleDrop = function (e: React.DragEvent<HTMLFormElement>): void {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (file: File) => {
    const fr = new FileReader()
    fr.onload = receivedText
    fr.readAsText(file)

    function receivedText(): void {
      let result: string
      if (fr.result) {
        // convert to string
        if (typeof fr.result !== 'string') {
          result = arrBufToStr(fr.result)
        } else {
          result = fr.result
        }
        // turn string to 2d array
        const data = CSVtoArray(result)

        setData(data)

        // data ready to send to backend
      }
    }
  }

  // triggers when file is selected
  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
      // clear file input
      e.target.value = ''
    }
  }

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current?.click()
  }

  const handleCSVStatus = () => {
    if (!data) return 'Непредвиденная ошибка!'
    console.log(data, 'data')

    // if (data[0][0] === '') {
    //   return 'Выберите или перетащите файл'
    // }

    if (data.length > 0) {
      return 'Файл успешно внесен'
    } else {
      return 'Ошибка! Проверьте корректность данных файла!'
    }
  }

  return (
    <form
      className={cls.form}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <input
        id='input-file-upload'
        ref={inputRef}
        type='file'
        className={`${cls.input}`}
        multiple={false}
        onChange={handleChange}
      />
      <label
        className={`${cls.label} ${isDragActive ? cls.dragActive : ''}`}
        htmlFor='input-file-upload'
      >
        <UploadSvg />
        <button
          type='button'
          className={cls.uploadButton}
          onClick={onButtonClick}
        >
          {handleCSVStatus()}
        </button>
      </label>
    </form>
  )
}
