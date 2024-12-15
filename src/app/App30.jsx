import { useMemo, useState } from "react"

// 父子组件
// function Child({ count, handleClick }) {
//   return <button onClick={handleClick}>子组件的计数：{count}</button>
// }

// function Demo() {
//   const [count, setCount] = useState(0)

//   const handleClick = () => setCount(count + 1);

//   return (
//     <div>
//       <h1>父组件</h1>
//       <Child count={count} handleClick={handleClick} />
//     </div>
//   )
// }
// React-Compiler编译后：
/**
  function Child(t0) {
    const $ = _c(3);
    const { count, handleClick } = t0;
    let t1;
    if ($[0] !== count || $[1] !== handleClick) {
      t1 = <button onClick={handleClick}>子组件的计数：{count}</button>;
      $[0] = count;
      $[1] = handleClick;
      $[2] = t1;
    } else {
      t1 = $[2];
    }
    return t1;
  }
  function Demo() {
    const $ = _c(6);
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
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
      t1 = <h1>父组件</h1>;
      $[2] = t1;
    } else {
      t1 = $[2];
    }
    let t2;
    if ($[3] !== count || $[4] !== handleClick) {
      t2 = (
        <div>
          {t1}
          <Child count={count} handleClick={handleClick} />
        </div>
      );
      $[3] = count;
      $[4] = handleClick;
      $[5] = t2;
    } else {
      t2 = $[5];
    }
    return t2;
  }
 */

// 语义化
function useCache(size) {
  return useMemo(() => {
    const array = new Array(size)
    array.fill(Symbol.for("react.memo_cache_sentinel"))
    return array
  }, [])
}

function Child(props) {
  const cache = useCache(3)
  // 从属性里取
  const { count, handleClick } = props;
  // 缓存返回值
  let buttonElement;
  if (cache[0] !== count || cache[1] !== handleClick) {
    buttonElement = (<button onClick={handleClick}>子组件的计数：{count}</button>);
    cache[0] = count;
    cache[1] = handleClick;
    cache[2] = buttonElement    
  } else {
    buttonElement = cache[2]
  }
  return buttonElement
}

function Demo() {
  const cache = useCache(6)
  const [count, setCount] = useState(0)
  // 缓存函数
  let handleClick;
  if (cache[0] !== count) {
    handleClick =() => setCount(count + 1)
    cache[0] = count;
    cache[1] = handleClick
  } else {
    handleClick = cache[1]
  }
  // 缓存返回值
  let h1Element;
  if (cache[2] === Symbol.for('react.memo_cache_sentinel')) {
    h1Element = <h1>父组件</h1>
    cache[2] = h1Element
  } else {
    h1Element = cache[2]
  }
  let containerElement;
  if (cache[3] !== count || cache[4] !== handleClick) {
    containerElement = (
      <div>
        {h1Element}
        <Child count={count} handleClick={handleClick} />
      </div>
    );
    cache[3] = count;
    cache[4] = handleClick;
    cache[5] = containerElement;
  } else {
    containerElement = cache[5]
  }
  return containerElement;
}

export default function App() {
  return <Demo />
}