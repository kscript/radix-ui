import { Slider, HStack, Input, Checkbox, Field, Textarea, Button, Text } from '@chakra-ui/react';
import { mergeAttrs, useDateState, formatKey } from '@/utils'
import theme from '@/theme'
const FormListAttrs = {
  py: 2,
  key: 'id'
}

export {
  useDateState
}
export const FormRequired = (Tag) => {
  return <><span style={{ color: 'red' }}>*</span>{Tag}</>
}
export const FormSubmit = (func) => {
  const state = {}
  return [
    async (...rest) => {
      if (state.disabled) return
      state.disabled = true
      try {
        if (typeof func === 'function') {
          await func(...rest)
        }
      } catch (error) {
        console.log(error)
      }
      state.disabled = false
    }
  ]
}
export const FormList = (fields, attrs = FormListAttrs) => {
  const { key, ...mergedAttrs } = mergeAttrs(FormListAttrs, attrs)
  return fields.map((item, index) => {
    const rest = Array.isArray(item) ? item : ['', item]
    return FormItemWrapper({
      key: formatKey(key, index, mergedAttrs),
      ...mergedAttrs
    }, ...rest)
  })
}

export const FormItem = (label, value, attrs = {}) => {
  const width = ((value || {}).props || {}).width || 'full'
  const errors = attrs.errors && ((value || {}).props || {}).prop ? attrs.errors[value.props.prop] : null
  const Error = errors ? <Text as="span" textStyle="xs" style={{ color: 'red' }}>{errors.find(Boolean)}</Text> : null
  return <Field.Root {...attrs}>
    { label ? typeof label === 'function' ? label() : <Field.Label display="flex" alignItems="center" justifyContent="space-between" width={width}>
      <span>{label}</span> {Error}
      </Field.Label> : Error }
    { value }
  </Field.Root>
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
  max: 100,
  width: 'full',
  colorPalette: theme.form.colorPalette
}
/**
 * 
 * @param {function} payload 用于获取/设置值
 * @param {object} attrs 传入的属性, 一般会设置在最外层标签上, 但也有可能取某些属性给里面的子标签使用
 * @returns 
 */
export const NumberSlider = (payload, attrs = NumberSliderAttrs) => {
  const mergedAttrs = mergeAttrs(NumberSliderAttrs, attrs)
  return <Slider.Root value={[payload()]} {...mergedAttrs} onValueChange={({ value }) => payload(value[0])}>
    <HStack justify="space-between">
      { mergedAttrs.label && <Slider.Label>{mergedAttrs.label}</Slider.Label> }
      <Slider.ValueText />
    </HStack>
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumbs>
      </Slider.Thumbs>
    </Slider.Control>
  </Slider.Root>
}

const CheckboxControlAttrs = {
  label: '',
  colorPalette: theme.form.colorPalette
}
export const CheckboxControl = (payload, attrs = CheckboxControlAttrs) => {
  const { label, ...mergedAttrs } = mergeAttrs(CheckboxControlAttrs, attrs)
  return <Checkbox.Root {...mergedAttrs} checked={payload()} onCheckedChange={e => payload(e.checked)}>
    <Checkbox.HiddenInput />
    <Checkbox.Control />
    <Checkbox.Label>{label}</Checkbox.Label>
  </Checkbox.Root>
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
const ButtonControlAttrs = {
  size: 'sm',
  colorPalette: theme.form.colorPalette
}
export const ButtonControl = (attrs = ButtonControlAttrs) => {
  const mergedAttrs = mergeAttrs(ButtonControlAttrs, attrs)
  return <Button {...mergedAttrs} >{ mergedAttrs.children }</Button>
}