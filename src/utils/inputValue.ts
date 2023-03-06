export const inputValue = (value: string | number | Date | boolean): string => {
  if (typeof value === 'string') {
    return value
  } else if (typeof value === 'boolean') {
    return ''
  } else if (value instanceof Date) {
    return `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`
  } else {
    return ''
  }
}

export const boolValue = (value: string | number | Date | boolean): boolean =>
  typeof value === 'boolean' ? value : false
