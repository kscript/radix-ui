import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { BaseSettings } from './base'
import { WebsiteSettings } from './website'
import { WebsiteList } from './websites'
import { useTabs } from '@/components/tabs'
export default function MyApp() {
  const [Tabs] = useTabs({
    tabs: [
      ['基础配置', { mr: 2 }],
      ['网站配置', { mr: 2 }],
      ['网站列表']
    ],
    panels: [
      [<BaseSettings/>, { mt: 2 }],
      [<WebsiteSettings/>, { mt: 2 }],
      [<WebsiteList/>, { mt: 2 }]
    ],
    options: {
      panel: {
        height: 380
      }
    }
  })
  return (
    <Flex alignItems="center" justifyContent="center" w="100%" h="100%">
      <Box bg="#f1f1f1" w="720px" p={[8, 12]} borderRadius={5}>
        <Heading as="h3" mb={5} size="lg" textAlign="center"> 插件配置 </Heading>
        <Flex direction="column" gap="5">
          <Tabs></Tabs>
        </Flex>
      </Box>
    </Flex>
  );
}