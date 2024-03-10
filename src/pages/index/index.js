import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { BaseSettings } from './base'
// import { WebsiteSettings } from './website'
// import { useTabs } from '@/components/tabs'
export default function MyApp() {
  // const [Tabs] = useTabs({
  //   tabs: [
  //     '基础配置',
  //     '网站配置',
  //   ],
  //   panels: [
  //     [<BaseSettings/>, { mt: 2 }],
  //     [<WebsiteSettings />, { mt: 2 }]
  //   ]
  // })
  return (
    <Box d="flex" alignItems="center" justifyContent="center" w="100%" h="100%">
      <Box bg="#f1f1f1" w="500px" p={12} borderRadius={5}>
        <Heading as="h3" mb={5} size="lg" textAlign="center"> 插件配置 </Heading>
        <Flex direction="column" gap="5">
          <BaseSettings></BaseSettings>
        </Flex>
      </Box>
    </Box>
  );
}