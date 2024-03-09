import { useState } from 'react';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Stack, Checkbox, FormControl, FormLabel, Textarea } from '@chakra-ui/core';

export const mergeAttrs = (defaultAttrs, attrs = {}) => {
  return Object.assign({},
    defaultAttrs instanceof Object ? defaultAttrs : {},
    attrs instanceof Object ? attrs : {}
  )
}

const FormListAttrs = {
  py: 2,
  key: 'id'
}
export const FormList = (fields, attrs = FormListAttrs) => {
  const { key, ...mergedAttrs } = mergeAttrs(FormListAttrs, attrs)
  return fields.map((item, index) => FormItemWrapper({ key: mergedAttrs[key] || mergedAttrs.uuid || index, ...mergedAttrs }, ...item))
}

/**
 * @param {object} initialState useState初始值
 * @param {boolean=} modify 是否要对setState包装修改
 * @returns [state, useValue, setState]
 * @desc 
 * modify为false时，useValue调用的也是setState
 * @example
 * const [form, useValue] = useFormState({ age: 18 })
 * const age = useValue(name)
 * age(20) // 设置
 * console.log(age()) // 获取
 */
export const useFormState = (initialState, modify = true) => {
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
      if (rest.length) {
        const [value] = rest
        setState((prevValues) => ({
          ...prevValues,
          [name]: value
        }))
      }
      return state[name]
    }
  }
  return [state, useValue, setState]
}

export const FormItem = (label, value, attrs = {}) => {
  return <FormControl {...attrs}>
    { label ? <FormLabel> {label} </FormLabel> : null }
    { value }
  </FormControl>
}

/**
 * 
 * @param {object} defaultAttrs 给FormItem扩展一些默认属性, 优先级较低
 * @returns 
 */
export const FormItemWrapper = (defaultAttrs, label, value, attrs = {}) => {
  return FormItem(label, value, mergeAttrs(defaultAttrs, attrs))
}

const NumberSliderAttrs = {
  min: 1,
  max: 100
}
/**
 * 
 * @param {function} payload 用于获取/设置值
 * @param {object} attrs 传入的属性, 一般会设置在最外层标签上, 但也有可能取某些属性给里面的子标签使用
 * @returns 
 */
export const NumberSlider = (payload, attrs = NumberSliderAttrs) => {
  const mergedAttrs = mergeAttrs(NumberSliderAttrs, attrs)
  return <Slider {...mergedAttrs} value={payload()} onChange={(value) => payload(value)}>
    <SliderTrack />
    <SliderFilledTrack />
    <SliderThumb
      fontSize="sm"
      width="32px"
      height="20px"
      children={payload()}
    />
  </Slider>
}

const CheckboxControlAttrs = {
  label: ''
}
export const CheckboxControl = (payload, attrs = CheckboxControlAttrs) => {
  const { label, ...mergedAttrs } = mergeAttrs(CheckboxControlAttrs, attrs)
  return <Stack spacing={2} isInline>
    <Checkbox {...mergedAttrs} isChecked={payload()} onChange={(e) => payload(e.target.checked)}>
      {label}
    </Checkbox>
  </Stack>
}

const TextareaControlAttrs = {
  size: 'sm',
  resize: 'none'
}
export const TextareaControl = (payload, attrs = TextareaControlAttrs) => {
  const mergedAttrs = mergeAttrs(TextareaControlAttrs, attrs)
  return <Textarea {...mergedAttrs} defaultValue={payload()} onChange={(e) => payload(e.target.value)} />
}