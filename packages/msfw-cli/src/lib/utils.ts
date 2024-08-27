export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function'
}

export function isArray(value: any): value is Array<any> {
  return Array.isArray(value)
}

export function isString(value: any): value is string {
  return typeof value === 'string'
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}
