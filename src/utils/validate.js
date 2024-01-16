/**
 * 判断是否为外部资源
 * @param {*} path 外部资源路径
 * @returns boolean
 */
export const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
