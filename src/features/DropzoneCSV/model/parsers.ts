import { CSVSeparator, type IRegexParser } from './types'

/**
 * Создает объект парсера для разбора строк CSV, используя заданный разделитель.
 *
 * Функция генерирует регулярные выражения для валидации строк CSV и извлечения значений из них.
 * `regValid` используется для проверки валидности строки CSV,
 * `regValue` - для извлечения отдельных значений из строки.
 *
 * @param {CSVSeparator} separator Разделитель для CSV (например, запятая или точка с запятой).
 * @return {IRegexParser} Объект с регулярными выражениями для парсинга CSV строки.
 */
const createRegexParser = (separator: CSVSeparator): IRegexParser => {
  return {
    regValid: new RegExp(`^\\s*(?:'[^'\\\\]*(?:\\\\[\\S\\s][^'\\\\]*)*'|"[^"\\\\]*(?:\\\\[\\S\\s][^"\\\\]*)*"|[^${separator}'"\\s\\\\]*(?:\\s+[^${separator}'"\\s\\\\]+)*)\s*(?:${separator}\\s*(?:'[^'\\\\]*(?:\\\\[\\S\\s][^'\\\\]*)*'|"[^"\\\\]*(?:\\\\[\\S\\s][^"\\\\]*)*"|[^${separator}'"\\s\\\\]*(?:\\s+[^${separator}'"\\s\\\\]+)*)\\s*)*$`),
    regValue: new RegExp(`(?!\\s*$)\\s*(?:'([^'\\\\]*(?:\\\\[\\S\\s][^'\\\\]*)*)'|"([^"\\\\]*(?:\\\\[\\S\\s][^"\\\\]*)*)"|([^${separator}'"\\s\\\\]*(?:\\s+[^${separator}'"\\s\\\\]+)*))\\s*(?:${separator}|$)`, 'g')
  } as IRegexParser
}

/**
 * Объект, содержащий парсеры для разбора CSV строк.
 * Каждый парсер соответствует определенному разделителю.
 * Можно легко добавить новый парсер, расширив перечисление `CSVSeparator` и вызвав `createRegexParser`.
 */
export const Parsers: Record<CSVSeparator, IRegexParser> = {
  [CSVSeparator.COMMA]: createRegexParser(CSVSeparator.COMMA),
  [CSVSeparator.SEMICOLON]: createRegexParser(CSVSeparator.SEMICOLON)
}
