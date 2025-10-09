import React, { useState } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { BaseSettings } from './base'
import { WebsiteSettings } from './website'
import { WebsiteList } from './websites'
import { useTabs } from '@/components/tabs'
export default function MyApp() {
  const [context, setContext] = useState({
    tab: 0,
    dirty: ''
  })
  const [Tabs] = useTabs({
    tabs: [
      ['基础配置', { mr: 2 }],
      ['网站配置', { mr: 2 }],
      ['网站列表']
    ],
    panels: [
      [<BaseSettings context={context} update={setContext}/>, { mt: 1 }],
      [<WebsiteSettings context={context} update={setContext}/>, { mt: 1 }],
      [<WebsiteList context={context} update={setContext}/>, { mt: 1 }]
    ],
    options: {
      panel: {
        height: 420
      }
    }
  })
  return (
    <Flex alignItems="center" justifyContent="center" w="100%" h="100%">
      <Box bg="#fcfcfc" w="720px" p={[8, 12]} borderRadius={5} border="1px solid #eaeaea">
        <Heading as="h3" mb={5} size="lg" textAlign="center"> 插件配置 </Heading>
        <Flex direction="column" gap="5">
          <Tabs context={context} update={setContext}></Tabs>
        </Flex>
      </Box>
    </Flex>
  );
}