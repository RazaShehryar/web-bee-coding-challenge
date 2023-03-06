export type MachineTypeValue = {
  fieldId: string
  value: string | number | Date | boolean
}

export type MachineType = {
  id: string
  categoryId: string
  fields: Record<string, MachineTypeValue>
}
