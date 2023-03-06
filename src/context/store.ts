import AsyncStorage from '@react-native-async-storage/async-storage'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { Category, Field } from 'models/Category'

const randomProperty = (obj: Record<string, Field>) => {
  const keys = Object.keys(obj)
  // eslint-disable-next-line no-bitwise
  return obj[keys[(keys.length * Math.random()) << 0]]
}
class Store {
  isHydrated = false
  categories: Record<string, Category> = {}
  orientation = 'PORTRAIT'

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

  addCategory = (value: Category) => (this.categories[value.id] = value)

  updateTitleField = (categoryId: string, fieldId: string) =>
    (this.categories[categoryId].titleField = fieldId)

  updateCategoryTitle = (text: string, categoryId: string) =>
    (this.categories[categoryId].title = text)

  updateFieldTitle = (text: string, categoryId: string, fieldId: string) => {
    const alreadyExists = Object.values(this.categories[categoryId].fields).some(
      (value) => value.title.toLowerCase() === text.toLowerCase(),
    )
    this.categories[categoryId].fields[fieldId].title = alreadyExists
      ? this.categories[categoryId].fields[fieldId].title
      : text
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
