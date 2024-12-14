import React, { useMemo } from "react";

// function App() {
//   return (
//     <div>hello</div>
//   )
// }
export default App;

// 上面的代码被编译成：
/* function App() {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = <div>hello</div>;
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}
 */

// 其实等于
// 以下是语义化代码
// 创建一个接收指定size的数组，初始化并返回
function _cacheArray(size) {
  const array = new Array(size)
  // 初始填充哨兵
  array.fill(Symbol.for("react.memo_cache_sentinel"))
  return array
}

function _c2(size) {
  // 获取当前组件正在渲染的实例
  const instance = React.getCurrentInstance();
  // 如果说当前的实例没有缓存，则创建新的缓存
  if(!instance._cache) {
    instance._cache = new Array(size)
    instance._cache.fill(Symbol.for("react.memo_cache_sentinel"))
  }
  return instance._cache
}

function _c3(size) {
  return useMemo(() => {
    const array = new Array(size)
    // 初始填充哨兵
    array.fill(Symbol.for("react.memo_cache_sentinel"))
    return array
  }, [])
}

function App() {
  // 使用 ReactCompiler初始化缓存数组，分配一个大小为1的缓存数组
  const cacheArray = _c3(1)
  // 定义一个存储jsx的变量
  let jsxElement;
  // 检查缓存数组第一个是否是哨兵,如果是，就是没有值,将返回的元素替换进去
  if(cacheArray[0] === Symbol.for("react.memo_cache_sentinel")) {
    jsxElement = <div>hello</div>;
    // 将生成的jsx元素存入缓存中
    cacheArray[0] = jsxElement;
  }else { 
    // 如果有值就从缓存里取
    jsxElement = cacheArray[0]
  }
  // 返回jsx元素，复用或生成新的结果
  return jsxElement
}