/**
 * Проверяет строку кода на наличие потенциально опасных или запрещенных выражений.
 * Использует регулярное выражение для поиска участков кода, которые могут указывать
 * на попытки выполнения несанкционированных действий, таких как бесконечные циклы,
 * доступ к cookie, sessionStorage, localStorage, объектам window, navigator, location,
 * использование XMLHttpRequest и fetch для сетевых запросов.
 *
 * @param {string} code Строка кода для проверки.
 * @return {RegExpMatchArray | null} Массив совпадений, найденных в коде, или null, если совпадений нет.
 */
const regexp = /while\(true\)|while\(!false\)|document\.|cookie|sessionstorage|localstorage|window|navigator|location|XMLHttpRequest|fetch/mg

export const isSafe = (code: string): RegExpMatchArray | null => {
  // Удаление всех пробельных символов из кода для упрощения поиска совпадений
  const checkingCode = code.replace(/\s/g, '')

  // Поиск совпадений с использованием регулярного выражения
  const isMatch = checkingCode.match(regexp)

  return isMatch
}
