export const initData = (key) => (callback) => {
  if (window.chrome.storage) {
    window.chrome.storage.local.get(key, (data) => {
      if (typeof callback === 'function') {
        callback(data[key])
      }
    })
  }
}
export const saveData = (key) => (data, callback) => {
  if (window.chrome.storage) {
    window.chrome.storage.local.set({
      [key]: data
    }, (...rest) => {
      if (typeof callback === 'function') {
        callback(...rest)
      }
    })
  }
}
export const useChromeStorage = (key) => {
  return [initData(key), saveData(key)]
}