import { useRef, useState } from "react";
// 制作秒表
export default function App() {
  const [startTime, setStartTime] = useState(null)
  const [now, setNow] = useState(null)
  const intervalRef = useRef(null)


  const handleStart = () => {
    setStartTime(Date.now())
    setNow(Date.now())
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setNow(Date.now()) // 每 10ms 更新一次当前时间。
    }, 10)
  }

  const handleStop = () => {
    clearInterval(intervalRef.current)
  }

  let secondPassed = 0;
  if(startTime != null && now != null) {
    secondPassed = (now - startTime) / 1000
  }

  return (<>
    <h1>时间过去了： {secondPassed.toFixed(2)}</h1>
    <button onClick={handleStart}>开始</button>
    <button onClick={handleStop}>停止</button>
  </>)
}



// 基础入门
// export default function App() {
//   // ref 指向一个数字
//   // 像 state 一样，你可以让它指向任何东西：字符串、对象，甚至是函数。
//   // 与 state 不同的是，ref 是一个普通的 JavaScript 对象，具有可以被读取和修改的 current 属性。
//   const ref = useRef(0)

//   const handleClick = () => {
//     ref.current = ref.current + 1
//     console.log(`你点击了${ref.current}次`)
//   }

//   return (
//     <div onClick={handleClick}>点击我</div>
//   )
// }
