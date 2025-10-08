export const initData = (key) => (callback) => {
  return new Promise((resolve) => { 
    if (window.chrome.storage) {
      window.chrome.storage.local.get(key, (data) => {
        resolve(data)
        if (typeof callback === 'function') {
          callback(data[key])
        }
      })
    } else if (process.env.NODE_ENV === 'development') {
      const storage = localStorage.getItem(key)
      if (storage === null) return resolve()
      try {
        const data = JSON.parse(storage)
        resolve(data)
        if (typeof callback === 'function') {
          callback(data)
        }
      } catch (error) {
        resolve()
      }
    } else {
      resolve()
    }
  })
}
export const saveData = (key) => (data, callback) => {
  return new Promise((resolve) => {
    if (window.chrome.storage) {
      window.chrome.storage.local.set({
        [key]: data
      }, (...rest) => {
        resolve(true)
        if (typeof callback === 'function') {
          callback(...rest)
        }
      })
    } else if (process.env.NODE_ENV === 'development') {
      localStorage.setItem(key, data instanceof Object ? JSON.stringify(data) : data)
      resolve(true)
      if (typeof callback === 'function') {
        callback(true)
      }
    } else {
      resolve(false)
    }
  })
}
export const useChromeStorage = (key) => {
  return [initData(key), saveData(key)]
}