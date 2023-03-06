import {
  CommonActions,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native'
import { createRef } from 'react'

export const navigationRef = createRef<NavigationContainerRef<any>>()

export function navigate(name: string, params?: Record<string, unknown>): void {
  return navigationRef.current?.navigate(name, params)
}

export function push(name: string, params?: Record<string, unknown>): void {
  return navigationRef.current?.dispatch(StackActions.push(name, params))
}

export function replace(name: string, params?: Record<string, unknown>): void {
  return navigationRef.current?.dispatch(StackActions.replace(name, params))
}

export function goBack(): void {
  return navigationRef.current?.goBack()
}
export function canGoBack(): boolean | undefined {
  return navigationRef.current?.canGoBack()
}
export function reset(
  routes: { name: string; params: Record<string, unknown>; path?: string }[],
  index: number,
): void {
  return navigationRef.current?.dispatch(CommonActions.reset({ index, routes }))
}
