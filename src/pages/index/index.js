import React from 'react';
import { Box, Flex, Button, Heading } from '@chakra-ui/core';
import { FormList, NumberSlider, CheckboxControl, TextareaControl, useFormState } from '@/components/form';
export default function MyApp() {
  const [form, useValue] = useFormState({
    partLimit: 1e3,
    requestLimit: 5,
    retry: 3,
    retain: true,
    copyright: ''
  })
  const onSave = () => {
    if (window.chrome.storage) {
      window.chrome.storage.local.set({
        localOptions: form
      }, () => {
        alert('保存成功')
      })
    }
  }
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
      TextareaControl(useValue('copyright'), {
        disabled: form.retain
      })
    ],
    [
      undefined,
      <Button size="sm" variantColor="teal" variant="solid" border={0} onClick={onSave}>保存插件配置</Button>
    ]
  ]
  return (
    <Box d="flex" alignItems="center" justifyContent="center" w="100%" h="100%">
      <Box bg="#f1f1f1" w="500px" p={12} borderRadius={5}>
        <Heading as="h3" my={2} size="lg" textAlign="center"> 插件配置 </Heading>
        <Flex direction="column" gap="5">
          {FormList(fields)}
        </Flex>
      </Box>
    </Box>
  );
}