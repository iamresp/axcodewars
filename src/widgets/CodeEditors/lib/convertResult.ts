export const convertResult = (result: unknown): string => {
  if (typeof result === 'object') {
    return JSON.stringify(result)
  }

  return String(result)
}
