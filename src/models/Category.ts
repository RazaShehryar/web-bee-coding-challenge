export interface Field {
  type: 'checkbox' | 'number' | 'date' | 'string'
  title: string
  id: string
}
export interface Category {
  id: string
  title: string
  fields: Record<string, Field>
  titleField: string
}
