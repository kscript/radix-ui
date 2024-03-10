import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/core';
import { FormList, NumberSlider, CheckboxControl, TextareaControl, useDateState } from '@/components/form';
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
    retain: true,
    copyright: ''
  })
  const fields = [
    [
      '请求并发个数',
      NumberSlider(useValue('requestLimit'))
    ],
    [
      '请求重试次数',
      NumberSlider(useValue('retry'))
    ],
    [
      '分片文件个数',
      NumberSlider(useValue('partLimit'), { max: 5e3 })
    ],
    [
      CheckboxControl(useValue('retain'), { label: '保留插件版权信息' })
    ],
    [
      '自定义版权信息(markdown)',
      TextareaControl(useValue('copyright')),
      {
        display: form.retain ? 'none' : 'block'
      }
    ],
    [
      undefined,
      <Button size="sm" variantColor="teal" variant="solid" border={0} onClick={() => onSaveStorage(form)}>保存插件配置</Button>
    ]
  ]
  useEffect(() => {
    getStorage((storage) => {
      setForm((prevValues) => ({
        ...prevValues,
        ...storage
      }))
    })
  }, [])
  return FormList(fields)
}