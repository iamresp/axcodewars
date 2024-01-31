export const convertParams = (params: string[]): string => {
  const newArr = params.map(param => {
    try {
      if (JSON.parse(param) !== undefined) {
        return param
      }

      return param
    } catch (e) {
      return JSON.stringify(param)
    }
  })

  return newArr.join(', ')
}
