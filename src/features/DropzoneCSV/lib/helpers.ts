import { CSVSeparator } from '../model/types'
import { Parsers } from '../model/parsers'

/**
 * Преобразует ArrayBuffer в строку.
 *
 * @param {ArrayBuffer} buf Буфер для преобразования.
 * @return {string} Строка, полученная из ArrayBuffer.
 */

export const arrBufToStr = (buf: ArrayBuffer): string => {
  return String.fromCharCode.apply(null, Array.from(new Uint16Array(buf)))
}

/**
 * Проверяет, является ли строка массива допустимой строкой CSV.
 *
 * @param {string[]} row Строка массива для проверки.
 * @return {boolean} Возвращает true, если строка допустима.
 */
const isValidCSVrow = (row: string[]): boolean => (
  row.length > 4 && row.length % 2 === 0
)

/**
 * Разбирает строку CSV и возвращает массив значений.
 *
 * @param {string} str Строка для разбора.
 * @param {CSVSeparator} separator Разделитель для использования.
 * @return {string[]} Массив значений, извлеченных из строки CSV.
 */
const parseCSVstring = (str: string, separator: CSVSeparator): string[] => {
  // Return empty array if input string is not well formed CSV string.
  if (!Parsers[separator].regValid.test(str)) return []
  const a = [] // Initialize array to receive values.
  str.replace(
    // "Walk" the string using replace with callback.
    Parsers[separator].regValue,
    function (m0: string, m1: string, m2: string, m3: string) {
      // Remove backslash from \' in single quoted values.
      if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"))
      // Remove backslash from \" in double quoted values.
      else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'))
      else if (m3 !== undefined) a.push(m3)

      return '' // Return empty string.
    }
  )
  // Handle special case of empty last value.
  if (/,\s*$/.test(str)) a.push('')

  return a
}

/**
 * Возвращает все возможные разделители CSV.
 *
 * @return {CSVSeparator[]} Массив всех разделителей.
 */
const getAllSeparators = (): CSVSeparator[] => {
  const separatorsArr: CSVSeparator[] = []
  Object.values(CSVSeparator).forEach(separator => {
    if (isNaN(Number(separator))) {
      separatorsArr.push(separator)
    }
  })

  return separatorsArr
}

/**
 * Преобразует текст CSV в массив строк.
 *
 * @param {string} text Текст для преобразования.
 * @return {string[][]} Массив строк, полученных из текста CSV.
 */
export const CSVtoArray = (text: string): string[][] => {
  // split CSV table to array of rows
  const CSVData: string[] = text.split(/\r\n|\r|\n/)
  // go through all separators
  for (const separator of getAllSeparators()) {
    // store parsed CSV
    const currentData: string[][] = new Array(CSVData.length).fill([])

    // parse every row of CSV
    for (let row = 0; row < CSVData?.length; row++) {
      currentData[row] = parseCSVstring(CSVData[row], separator as CSVSeparator)
    }

    // remove last subarray if empty
    if (currentData.length > 0 && currentData.at(-1)?.length === 0) {
      currentData.pop()
    }
    console.log('currentData', currentData)
    // validation: go through array and check
    // if all subarrays length more than 4 and divides by 2
    if (currentData.every(isValidCSVrow)) return currentData
  }

  return []
}
