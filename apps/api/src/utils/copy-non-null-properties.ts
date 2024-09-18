/* eslint-disable @typescript-eslint/no-explicit-any */
import omit from 'lodash.omit'

/**
 * A utility class for copying non-null properties from one object to another.
 */
export class CopyNonNullProperties {
  static getNullPropertyNames(source: any): string[] {
    const emptyNames: string[] = []

    for (const key in source) {
      if (source[key] === null || source[key] === undefined) {
        emptyNames.push(key)
      }
    }

    return emptyNames
  }

  /**
   * Copies non-null properties from the source object to the target object.
   *
   * @param source - The object from which properties are copied.
   * @param target - The object to which properties are copied.
   */
  static execute(source: any, target: any) {
    const nullPropertyNames = this.getNullPropertyNames(source)
    const propertiesToCopy = omit(source, nullPropertyNames)
    Object.assign(target, propertiesToCopy)
  }
}
