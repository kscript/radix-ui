import { useState, isValidElement } from "react";
export const formatObject = (object) => {
  return object instanceof Object ? object : {}
}

/**
 * 处理遍历列表时的key
 * @param {string} key 用于取得key的属性
 * @param {number} index 列表索引, 用于兜底
 * @param {object} attrs 用于取key的对象
 * @returns 
 */
export const formatKey = (keyName, index, attrs) => {
  attrs = formatObject(attrs)
  return attrs[keyName] || attrs.id || attrs.uuid || index
}

export const formatItem = (component, attrs) => {
  return [component, formatObject(attrs)]
}

/**
 * 
 * @param {Array} components 组件/组件属性列表
 * @param {Component} Component 组件 (配合组件属性)
 * @returns 
 */
export const formatList = (components, Component) => {
  const formated = (Array.isArray(components) ? components : [components]).map(item => {
    if (Array.isArray(item)) {
      return formatItem(...item)
    } else if (item instanceof Object) {
      if (isValidElement(item)) {
        return formatItem(item, {})
      }
      const { component, attrs } = item
      return formatItem(component, attrs)
    } else if (![null, undefined, false].includes(item)) {
      return formatItem(item, {})
    }
    return false
  })
  if (Component instanceof Object && typeof Component.render === 'function') {
    return formated.filter(item => item !== false).map(([item, attrs], index) => <Component key={index} {...attrs}>{item}</Component>)
  }
  return formated
}

export const mergeAttrs = (defaultAttrs, attrs = {}) => {
  return Object.assign({},
    formatObject(defaultAttrs),
    formatObject(attrs)
  )
}

/**
 * @param {object} initialState useState初始值
 * @param {boolean=} modify 是否要对setState包装修改
 * @returns [state, useValue, setState]
 * @desc 
 * modify为false时，useValue调用的也是setState
 * @example
 * const [form, useValue] = useDateState({ age: 18 })
 * const age = useValue(name)
 * age(20) // 设置
 * console.log(age()) // 获取
 */
export const useDateState = (initialState, modify = true) => {
  const [state, setState] = useState(initialState)
  /**
   * - modify为true时, 传入要使用state上的哪个值
   * - modify为false时, 参数与setState一致
   */
  const useValue = (...rest) => {
    if (!modify) {
      return setState(...rest)
    }
    const [name] = rest
    // 存取值
    return (...rest) => {
      // 为了可以支持处理多层级数据, useValue增加一个存取器
      const [value, payload] = rest
      const { getter, setter } = formatObject(payload)
      if (rest.length) {
        if (typeof setter === 'function') {
          setter(value, state, setState)
        } else {
          setState((prevValues) => ({
            ...prevValues,
            [name]: value
          }))
        }
      }
      if (typeof getter === 'function') {
        return getter(state)
      }
      return state[name]
    }
  }
  return [state, useValue, setState]
}