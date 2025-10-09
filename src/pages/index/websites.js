import { useState, useEffect } from 'react'
import { Listbox, Flex, Text, Collapsible, Button } from '@chakra-ui/react'
import { useChromeStorage as chromeStorage } from '@/utils/chrome'
import { formatDate } from '@/utils'
import theme from '@/theme'

const [
  getStorage,
  // setStorage
] = chromeStorage('websites')
// const onSaveStorage = (storage) => {
//   setStorage(storage, () => {
//     alert('保存成功')
//   })
// }
const initData = (setList) => {
  getStorage((storage) => {
    setList(Object.keys(storage).map((key) => storage[key]).sort((a, b) => a.timestamp - b.timestamp))
  })
}

export const WebsiteList = (props) => {
  const [list, setList] = useState([])
  const [active, setActive] = useState((list[0]||{}).origin || '')
  useEffect(() => {
    initData(setList)
  }, [props.context?.dirty])
  const handleEdit = (item) => () => {
    props.update(Object.assign({}, props.context, {
      tab: 1,
      name: item.origin,
      website: item
    }))
  }
  return <Listbox.Root>
    <Listbox.Content maxH="380px" background="none" border="0">
      {
        list.map(item => <Collapsible.Root width="full" key={item.origin} open={item.origin === active} onOpenChange={() => setActive(active === item.origin ? '' : item.origin)}>
          <Listbox.Item item={item} highlightOnHover>
            <Listbox.ItemText>
              <Collapsible.Trigger as="div">
                <Flex justify="space-between" align="center" p={1}>
                  <Text as="span">
                    <Text as="span" textStyle='lg' mr={2} style={{ cursor: 'pointer', color: theme.form.colorPalette }}>
                      {item.origin}
                    </Text>
                    <Text as="span" colorPalette="gray">{formatDate(item.timestamp)}</Text>
                  </Text>
                  <Button size="2xs" variant="outline" colorPalette={theme.form.colorPalette} onClick={handleEdit(item)}>修改</Button>
                </Flex>
                <Listbox.ItemIndicator>
                </Listbox.ItemIndicator>
              </Collapsible.Trigger>
            </Listbox.ItemText>
          </Listbox.Item>
          <Collapsible.Content px={5} py={2}>
            <pre>
              {JSON.stringify(item, null, 2)}
            </pre>
          </Collapsible.Content>
        </Collapsible.Root>)
      }
    </Listbox.Content>
  </Listbox.Root>
}