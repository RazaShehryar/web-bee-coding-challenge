import { Field } from 'models/Category'

export const pickRandomField = (obj: Record<string, Field>): Field => {
  const keys = Object.keys(obj)
  // eslint-disable-next-line no-bitwise
  return obj[keys[(keys.length * Math.random()) << 0]]
}
