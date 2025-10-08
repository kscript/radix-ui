import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import routes from './routes';
import theme from './theme';
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider value={theme.system}>
      <Router>
        <Routes>
          {Object.keys(routes).map((path) => {
            // 动态加载路由组件
            const LazyComponent = routes[path];
            return (
              <Route
                key={path}
                path={path}
                element={
                  // 添加一个加载中的占位符
                  <Suspense fallback={<div>Loading...</div>}>
                    <LazyComponent />
                  </Suspense>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;