import { useMemo, useState } from "react"

// function Counter() {
//   const [count, setCount] = useState(0)

//   const handleClick = () => setCount(count + 1)

//   return (
//     <button onClick={handleClick}>{count}</button>
//   )
// }


/**
 * 上面的函数编译成如下代码：
  function Counter() {
    const $ = _c(5);
    const [count, setCount] = useState(0);
    let t0;
    if ($[0] !== count) {
      t0 = () => setCount(count + 1);
      $[0] = count;
      $[1] = t0;
    } else {
      t0 = $[1];
    }
    const handleClick = t0;
    let t1;
    if ($[2] !== count || $[3] !== handleClick) {
      t1 = <button onClick={handleClick}>{count}</button>;
      $[2] = count;
      $[3] = handleClick;
      $[4] = t1;
    } else {
      t1 = $[4];
    }
    return t1;
  }

 */

/** 
 * 语义化实现Counter
 * @returns 组件
 */
// 缓存函数
function useCache(size) {
  return useMemo(() => {
    const array = new Array(size)
    array.fill(Symbol.for('eact.memo_cache_sentinel'))
    return array;
  },[])
}

function Counter() {
  // 创建size为5的缓存数组
  const cache = useCache(5)
  // console.log(cache)
  // 初始化组件状态
  const [count, setCount] = useState(0)
  // 1. 缓存点击函数
  let handleClick;
  // 如果 count 值不等于 cache[0]
  // 初始化渲染的时候，cache[0]:Symbol.for('eact.memo_cache_sentinel')
  // 后面为更新后的新count值
  if (cache[0] !== count) {
    handleClick = () => setCount(count + 1)
    cache[0] = count;
    cache[1] = handleClick;
  } else {
    // 如果缓存一致
    handleClick = cache[1]
  }
  // 2. 缓存返回的jsx
  let jsxElement;
  // 判断返回的jsx,如果不一致，证明缓存失效，更新缓存
  if (cache[2] !== count || cache[3] !== handleClick) {
    jsxElement = <button onClick={handleClick}>{count}</button>
    cache[2] = count;
    cache[3] = handleClick;
    cache[4] = jsxElement;
  } else {
    // 缓存一致，直接返回jsx
    jsxElement = cache[4]
  }
  // 返回jsx渲染
  return jsxElement;
}


export default function App() {
  return <Counter />
}
