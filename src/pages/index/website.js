import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@chakra-ui/react'
import { FormList, InputControl, useDateState, FormRequired, FormSubmit } from '@/components/form'
import { useValidate } from '@/utils'
import { useChromeStorage as chromeStorage } from '@/utils/chrome'
// origin: 'juejin',
// // 处理链接
// link: true,
// // 处理换行
// br: false,
// // 处理代码块
// code: false,
// selectors: {
//   title: '.article-title',
//   body: '.markdown-body',
//   copyBtn: '.copy-code-btn',
//   userName: '.username .name',
//   userLink: '.username',
//   invalid: 'style',
//   unpack: '',
//   tag: '.article-end .tag-list .tag-item'
// }

const [getStorage, setStorage] = chromeStorage('websites')

const [onSaveStorage] = FormSubmit((form, props, { rules, validator } = {}) => {
  const {
    origin = '',
    hosts = '',
    ...selectors
  } = form
  const [valid, messages] = useValidate(form, rules)
  if (!valid) {
    typeof validator === 'function' && validator(messages)
    return
  }
  return getStorage().then((storage = {}) => {
    storage[props.name || origin] = {
      origin,
      hosts: hosts.split(','),
      selectors,
      timestamp: Date.now()
    }
    return setStorage(storage)
  }).then(valid => {
    valid && alert(props.name ? '保存成功' : '添加成功')
  })
})
const initData = (setForm, {
  props = {}
}) => {
  if (props.name) {
    getStorage((storage = {}) => {
      setForm((prevValues) => ({
        ...prevValues,
        ...storage[props.name]
      }))
    })
  }
}
const getPayload = (key) => {
  return {
    getter (state) {
      return (state.selectors || {})[key]
    },
    setter (value, state, setState) {
      setState((prevValues) => {
        state.selectors[key] = value
        return Object.assign(prevValues.selectors, state.selectors)
      })
    }
  }
}

export const WebsiteSettings = (props) => {
  const [form, useValue, setForm] = useDateState({
  })
  const [errors, setErrors] = useState(null)
  const attrs = { size: 'sm', flex: 'none', width: 280 }
  const rules = {
    origin: [
      { required: true, message: '请填写站点标识' }
    ],
    hosts: [
      { required: true, message: '请填写域名匹配规则' }
    ],
    body: [
      { required: true, message: '请填写内容选择器' }
    ]
  }
  const validator = (messages) => {
    setErrors(messages)
  }
  const mergeAttrs = (data) =>  Object.assign({}, attrs, data instanceof Object ? data : {})
  const fields = [
    [
      FormRequired('站点标识'),
      InputControl(useValue('origin'), mergeAttrs({ prop: 'origin', placeholder: '' }))
    ],
    [
      FormRequired('域名匹配规则'),
      InputControl(useValue('hosts'), mergeAttrs({ prop: 'hosts', placeholder: '数组形式, 逗号分割, 支持正则和字符串' }))
    ],
    [
      '标题选择器',
      InputControl(useValue('title', getPayload('title')), mergeAttrs({ prop: 'title', placeholder: '默认取页面标题' }))
    ],
    [
      FormRequired('内容选择器'),
      InputControl(useValue('body', getPayload('body', '.markdown-body')), mergeAttrs({ prop: 'body' }))
    ],
    [
      '用户名选择器',
      InputControl(useValue('userName', getPayload('userName')), mergeAttrs({ prop: 'userName' }))
    ],
    [
      '用户主页选择器',
      InputControl(useValue('userLink', getPayload('userLink')), mergeAttrs({ prop: 'userLink' }))
    ],
    [
      '标签选择器',
      InputControl(useValue('tag', getPayload('tag')), mergeAttrs({ prop: 'tag' }))
    ],
    [
      '屏蔽标签选择器',
      InputControl(useValue('invalid', getPayload('invalid')), mergeAttrs({ prop: 'invalid' }))
    ],
    [
      <Button size="sm" variantColor="teal" variant="solid" border={0} onClick={() => onSaveStorage(form, props, { rules, validator })}>新增网站</Button>
    ]
  ]
  useEffect(() => {
    initData(setForm, { props })
  }, [props])
  return <Grid templateColumns="repeat(2, 1fr)" gap={1}>
    {FormList(fields, { errors: errors })}
  </Grid>
}