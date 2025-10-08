import { useState, useEffect } from 'react'
import { Listbox, Flex, Heading, Text, Collapsible } from '@chakra-ui/react'
import { useChromeStorage as chromeStorage } from '@/utils/chrome'
import { formatDate } from '@/utils'

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
  }, [props])
  return <Listbox.Root variant="plain">
    <Listbox.Content maxH="380px">
      {
        list.map(item => <Collapsible.Root width="full" key={item.origin} open={item.origin === active} onOpenChange={() => setActive(active === item.origin ? '' : item.origin)}>
          <Listbox.Item item={item} highlightOnHover>
            <Listbox.ItemText>
              <Collapsible.Trigger as="div">
                <Flex justify="space-between" align="center" p={1}>
                  <Heading as="h3" size='lg' style={{ cursor: 'pointer' }}>{item.origin}</Heading>
                  <Text textStyle="xs">{formatDate(item.timestamp)}</Text>
                </Flex>
              </Collapsible.Trigger>
            </Listbox.ItemText>
          </Listbox.Item>
          <Collapsible.Content px={5}>
            <pre>
              {JSON.stringify(item, null, 2)}
            </pre>
          </Collapsible.Content>
        </Collapsible.Root>)
      }
    </Listbox.Content>
  </Listbox.Root>
}