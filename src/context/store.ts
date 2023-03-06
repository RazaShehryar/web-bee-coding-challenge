import AsyncStorage from '@react-native-async-storage/async-storage'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { Category } from 'models/Category'

class Store {
  isHydrated = false
  categories: Category[] = []
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

  addCategory = (value: Category) => this.categories.push(value)

  updateCategoryTitle = (text: string, categoryId: string) =>
    (this.categories = this.categories.map((item) =>
      item.id === categoryId ? { ...item, title: text } : item,
    ))

  updateFieldTitle = (text: string, categoryId: string, fieldId: string) => {
    this.categories = this.categories.map((item) =>
      item.id === categoryId
        ? {
            ...item,
            fields: {
              ...item.fields,
              [fieldId]: { ...item.fields[fieldId], title: text },
            },
          }
        : item,
    )
  }

  addField = (categoryId: string, fieldId: string) =>
    (this.categories = this.categories.map((item) => {
      if (item.id === categoryId) {
        return {
          ...item,
          fields: {
            ...item.fields,
            [fieldId]: { id: fieldId, type: 'string', title: '' },
          },
        }
      }
      return item
    }))

  removeField = (categoryId: string, fieldId: string) =>
    (this.categories = this.categories.map((item) => {
      if (item.id === categoryId) {
        delete item.fields[fieldId]
      }
      return item
    }))
  removeCategory = (value: string) => this.categories.filter((item) => item.id !== value)

  setIsHydrated = (value: boolean) => (this.isHydrated = value)
}

export default new Store()
