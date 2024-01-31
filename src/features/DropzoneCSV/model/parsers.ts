import { CSVSeparator, type IRegexParser } from './types'

const createRegexParser = (separator: CSVSeparator): IRegexParser => {
  return {
    regValid: new RegExp(`^\\s*(?:'[^'\\\\]*(?:\\\\[\\S\\s][^'\\\\]*)*'|"[^"\\\\]*(?:\\\\[\\S\\s][^"\\\\]*)*"|[^${separator}'"\\s\\\\]*(?:\\s+[^${separator}'"\\s\\\\]+)*)\s*(?:${separator}\\s*(?:'[^'\\\\]*(?:\\\\[\\S\\s][^'\\\\]*)*'|"[^"\\\\]*(?:\\\\[\\S\\s][^"\\\\]*)*"|[^${separator}'"\\s\\\\]*(?:\\s+[^${separator}'"\\s\\\\]+)*)\\s*)*$`),
    regValue: new RegExp(`(?!\\s*$)\\s*(?:'([^'\\\\]*(?:\\\\[\\S\\s][^'\\\\]*)*)'|"([^"\\\\]*(?:\\\\[\\S\\s][^"\\\\]*)*)"|([^${separator}'"\\s\\\\]*(?:\\s+[^${separator}'"\\s\\\\]+)*))\\s*(?:${separator}|$)`, "g")
  } as IRegexParser
}

// New parser can be easily added by adding separator to CSVSeparator
// and using createRegexParser that generate parser of choice
export const Parsers: Record<CSVSeparator, IRegexParser> = {
  [CSVSeparator.COMMA]: createRegexParser(CSVSeparator.COMMA),
  [CSVSeparator.SEMICOLON]: createRegexParser(CSVSeparator.SEMICOLON)
}
