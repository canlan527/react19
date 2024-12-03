import {useEffect, useRef, useState} from 'react'

function App() {
  // 定义计数器
  const [count, setCount] = useState(0)
  // 记录app组件渲染的次数
  const appRenderCount = useRef(0)
  // 定义组件是否已加载过
  const hasLoaded = useRef(false)

  console.log(`App组件渲染的次数：${++appRenderCount.current}`)
  
  // 严格模式下会执行两次
  useEffect(()=> {
    console.log(`Effect执行次数：${count}`)
    // 如果开发模式下不想有些操作执行两次，可以这样做：
    // if里的只有首次执行
    if(!hasLoaded.current) {
      console.log('首次执行的操作')
      hasLoaded.current = true;
    }
    // 清理函数
    return () => {
      console.log('Effect清理函数')
    }
  }, [count])// 依赖项
  
  return <div>
    <p>当前计数：{count}</p>
    <button onClick={() => setCount(count => count+1)}>+</button>
  </div>
}

export default App;