import lo from 'lodash'

/**
 * デップコピー
 */
export const deepCopy = <T>(obj: T): T => {
  return lo.cloneDeep(obj)
}

// export function deepCopy<T> (obj: T): T {
//     return lo.cloneDeep(obj);
// }
