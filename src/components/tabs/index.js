import { Tabs } from "@chakra-ui/react"
import { formatList } from '@/utils'
import theme from "@/theme"
const mapValue = (list) => list.map((item, value) => {
  item[1] = Object.assign(item[1] instanceof Object ? item[1] : {}, { value })
  return item
})
export const useTabs = ({
  tabs = [],
  panels = [],
  options = {}
}) => {
  const {
    tab: tabOptions = {},
    panel: panelOptions = {},
    ...rest
  } = options
  return [() => <Tabs.Root {...Object.assign({
    defaultValue: 0,
    colorPalette: theme.tabs.colorPalette,
    variant: 'outline'
  }, rest)}>
    <Tabs.List {...tabOptions}>
      {formatList(Tabs.Trigger, mapValue(tabs))}
    </Tabs.List>

    <Tabs.ContentGroup {...panelOptions}>
      {formatList(Tabs.Content, mapValue(panels))}
    </Tabs.ContentGroup>
  </Tabs.Root>]
}