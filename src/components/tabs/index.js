import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core"
import { formatList } from '@/utils'
export const useTabs = ({
  tabs = [],
  panels = []
}) => {
  return [() => <Tabs>
    <TabList>
      {formatList(tabs, Tab)}
    </TabList>

    <TabPanels>
      {formatList(panels, TabPanel)}
    </TabPanels>
  </Tabs>]
}