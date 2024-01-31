const regexp = /while\(true\)|while\(!false\)|document\.|cookie|sessionstorage|localstorage|window|navigator|location|XMLHttpRequest|fetch/mg

export const isSafe = (code: string): RegExpMatchArray | null => {
  const checkingCode = code.replace(/\s/g, '')
  const isMatch = checkingCode.match(regexp)

  return isMatch
}
