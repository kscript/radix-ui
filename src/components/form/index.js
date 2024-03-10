import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Stack, Input, Checkbox, FormControl, FormLabel, Textarea } from '@chakra-ui/core';
import { mergeAttrs, useDateState, formatKey } from '@/utils'

const FormListAttrs = {
  py: 2,
  key: 'id'
}

export {
  useDateState
}

export const FormList = (fields, attrs = FormListAttrs) => {
  const { key, ...mergedAttrs } = mergeAttrs(FormListAttrs, attrs)
  return fields.map((item, index) => FormItemWrapper({ key: formatKey(key, index, mergedAttrs), ...mergedAttrs }, ...item))
}

export const FormItem = (label, value, attrs = {}) => {
  return <FormControl {...attrs}>
    { label ? typeof label === 'function' ? label() : <FormLabel> {label} </FormLabel> : null }
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

const InputControlAttrs = {
}
export const InputControl = (payload, attrs = InputControlAttrs) => {
  const mergedAttrs = mergeAttrs(CheckboxControlAttrs, attrs)
  return <Input {...mergedAttrs} defaultValue={payload()} onChange={(e) => payload(e.target.value)} />
}

const TextareaControlAttrs = {
  size: 'sm',
  resize: 'none'
}
export const TextareaControl = (payload, attrs = TextareaControlAttrs) => {
  const mergedAttrs = mergeAttrs(TextareaControlAttrs, attrs)
  return <Textarea {...mergedAttrs} defaultValue={payload()} onChange={(e) => payload(e.target.value)} />
}