import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/core';
import { FormList, InputControl, useDateState } from '@/components/form';
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
const [getStorage, setStorage] = chromeStorage('websiteOptions')
const onSaveStorage = (storage) => {
  setStorage(storage, () => {
    alert('保存成功')
  })
}
const initData = ({
  setForm
}) => {
  getStorage((storage) => {
    setForm((prevValues) => ({
      ...prevValues,
      ...storage
    }))
  })
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
export const WebsiteSettings = () => {
  const [form, useValue, setForm] = useDateState({
  })
  const attrs = { size: 'sm', flex: 'none', width: 280 }
  const fields = [
    [
      '站点标识',
      InputControl(useValue('origin'), Object.assign({}, attrs, { placeholder: '' }))
    ],
    [
      '域名匹配',
      InputControl(useValue('hosts'), Object.assign({}, attrs, { placeholder: '数组形式, 支持正则和字符串' }))
    ],
    [
      '标题选择器',
      InputControl(useValue('title', getPayload('title')), attrs)
    ],
    [
      '内容选择器',
      InputControl(useValue('body', getPayload('body')), attrs)
    ],
    [
      '用户名选择器',
      InputControl(useValue('userName', getPayload('userName')), attrs)
    ],
    [
      '用户主页选择器',
      InputControl(useValue('userLink', getPayload('userLink')), attrs)
    ],
    [
      '标签选择器',
      InputControl(useValue('tag', getPayload('tag')), attrs)
    ],
    [
      '屏蔽标签选择器',
      InputControl(useValue('invalid', getPayload('invalid')), attrs)
    ],
    [
      undefined,
      <Button size="sm" variantColor="teal" variant="solid" border={0} onClick={() => onSaveStorage(form)}>新增网站</Button>
    ]
  ]
  useEffect(() => {
    initData({setForm})
  })
  return FormList(fields, { display: 'flex', justifyContent: 'space-between' })
}