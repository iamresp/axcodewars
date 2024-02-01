export enum CSVSeparator {
  SEMICOLON = ';',
  COMMA = ','
}

export interface IRegexParser {
  regValid: RegExp
  regValue: RegExp
}
