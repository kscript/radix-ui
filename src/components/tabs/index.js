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
  return [
    (props = {}) => {
      const mergeAttrs = Object.assign({
        colorPalette: theme.tabs.colorPalette,
        variant: 'outline'
      }, rest, {
        defaultValue: props.context?.tab || 0
      })
      return <Tabs.Root {...mergeAttrs}>
        <Tabs.List {...tabOptions}>
          {formatList(Tabs.Trigger, mapValue(tabs))}
        </Tabs.List>

        <Tabs.ContentGroup {...panelOptions}>
          {formatList(Tabs.Content, mapValue(panels))}
        </Tabs.ContentGroup>
      </Tabs.Root>
    }
  ]
}