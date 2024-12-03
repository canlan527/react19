import React, { Suspense,lazy } from "react";

// 懒加载组件 
const LazyComponent = lazy(() => import('./components/LazyComponent'))

function App() {
  return <Suspense fallback={<p>loading....</p>}>
  {/* return <Suspense fallback="loading...."> */}
    <LazyComponent/>
  </Suspense>
}

export default App;

/**
 * Suspense会等待包裹的异步组件加载好再渲染，在此期间会使用fallback属性中的内容来暂时渲染UI
 */