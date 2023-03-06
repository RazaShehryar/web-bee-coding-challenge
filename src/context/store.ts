import AsyncStorage from '@react-native-async-storage/async-storage'
import omit from 'lodash/omit'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { Category, Field } from 'models/Category'
import { MachineType, MachineTypeValue } from 'models/MachineType'

const randomProperty = (obj: Record<string, Field>) => {
  const keys = Object.keys(obj)
  // eslint-disable-next-line no-bitwise
  return obj[keys[(keys.length * Math.random()) << 0]]
}
class Store {
  isHydrated = false
  categories: Record<string, Category> = {}
  items: Record<string, MachineType> = {}
  orientation = 'PORTRAIT'
  selectedDateItem: null | (MachineTypeValue & { id: string }) = null

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'Store',
      properties: [],
      storage: AsyncStorage,
      stringify: true,
    })
      .then((e) => this.setIsHydrated(e.isHydrated))
      .catch((e) => console.warn(e))
  }

  setOrientation = (value: 'LANDSCAPE' | 'PORTRAIT') => (this.orientation = value)

  removeItem = (id: string) => (this.items = omit(this.items, id))

  addMachineTypeItem = (id: string, categoryId: string) => {
    this.items = {
      ...this.items,
      [id]: { id, categoryId, fields: this.items[categoryId]?.fields ?? {} },
    }
    const itemFields: MachineType['fields'] = {}

    const returnValue = (fieldId: string) => {
      const { type } = this.categories[categoryId].fields[fieldId]

      switch (type) {
        case 'checkbox':
          return false
        case 'string':
          return ''
        case 'number':
          return 0
        case 'date':
          return new Date()
        default:
          return 0
      }
    }
    Object.keys(this.categories[categoryId].fields).forEach(
      (value) =>
        (itemFields[value] = {
          value: returnValue(this.categories[categoryId].fields[value].id),
          fieldId: this.categories[categoryId].fields[value].id,
        }),
    )
    this.items[id].fields = itemFields
  }
  addCategory = (value: Category) => (this.categories[value.id] = value)

  setSelectedDateItem = (value: null | (MachineTypeValue & { id: string })) =>
    (this.selectedDateItem = value)
  updateFieldValue = (
    text: string | boolean | Date | number,
    itemId: string,
    fieldItem: MachineTypeValue,
  ) => {
    this.items = {
      ...this.items,
      [itemId]: {
        ...this.items[itemId],
        fields: {
          ...this.items[itemId].fields,
          [fieldItem.fieldId]: { ...fieldItem, value: text },
        },
      },
    }
  }
  updateTitleField = (categoryId: string, fieldId: string) =>
    (this.categories[categoryId].titleField = fieldId)

  updateCategoryTitle = (text: string, categoryId: string) =>
    (this.categories[categoryId].title = text)

  updateFieldTitle = (text: string, categoryId: string, fieldId: string) => {
    this.categories[categoryId].fields[fieldId].title = text
  }

  checkAndFixDuplicates = (text: string, categoryId: string, fieldId: string) => {
    const alreadyExists = Object.values(this.categories[categoryId].fields)
      .filter((val) => val.id !== fieldId)
      .some((value) => value.title.toLowerCase() === text.toLowerCase())
    this.categories[categoryId].fields[fieldId].title = alreadyExists
      ? ''
      : this.categories[categoryId].fields[fieldId].title
  }

  updateFieldType = (type: Field['type'], categoryId: string, fieldId: string) => {
    this.categories[categoryId].fields[fieldId].type = type
  }

  addField = (categoryId: string, fieldId: string) => {
    this.categories[categoryId].fields[fieldId] = {
      id: fieldId,
      type: 'string',
      title: '',
    }
  }

  removeField = (categoryId: string, fieldId: string) => {
    delete this.categories[categoryId].fields[fieldId]
    this.categories[categoryId].titleField =
      fieldId === this.categories[categoryId].titleField
        ? randomProperty(this.categories[categoryId].fields)?.id ?? ''
        : this.categories[categoryId].titleField
  }

  removeCategory = (value: string) => delete this.categories[value]

  setIsHydrated = (value: boolean) => (this.isHydrated = value)
}

export default new Store()
