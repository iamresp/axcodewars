export enum CSVSeparator {
  SEMICOLON = 'semicolon',
  COMMA = 'comma'
}

export interface IRegexParser {
  regValid: RegExp
  regValue: RegExp
}
