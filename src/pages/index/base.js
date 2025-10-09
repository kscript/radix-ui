import React, { useEffect } from 'react'
import { FormList, NumberSlider, CheckboxControl, TextareaControl, useDateState, ButtonControl } from '@/components/form'
import { useChromeStorage as chromeStorage } from '@/utils/chrome'

const [getStorage, setStorage] = chromeStorage('localOptions')
const onSaveStorage = (storage) => {
  setStorage(storage, () => {
    alert('保存成功')
  })
}
export const BaseSettings = () => {
  const [form, useValue, setForm] = useDateState({
    partLimit: 1e3,
    requestLimit: 5,
    retry: 3,
    retain: false,
    copyright: ''
  })
  const fields = [
    NumberSlider(useValue('requestLimit'), { label: '请求并发个数' }),
    NumberSlider(useValue('retry'), { label: '请求重试次数' }),
    NumberSlider(useValue('partLimit'), { label: '分片文件个数', max: 5e3 }),
    CheckboxControl(useValue('retain'), { label: '保留插件版权信息', style: { cursor: 'pointer' } }),
    [
      '自定义版权信息(markdown)',
      TextareaControl(useValue('copyright'), {
        placeholder: '[${title}](${url})',
        disabled: form.retain
      })
    ],
    <ButtonControl onClick={() => onSaveStorage(form)}>保存插件配置</ButtonControl>
  ]
  useEffect(() => {
    getStorage((storage) => {
      setForm((prevValues) => ({
        ...prevValues,
        ...storage
      }))
    })
  }, [setForm])
  return FormList(fields)
}