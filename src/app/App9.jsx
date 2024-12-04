import { Suspense, use } from "react";
import PropTypes from 'prop-types'

// 根据传入时间决定何时发送请求的函数
function fetchDataByTime(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms.toString()) // 将延迟时间传出去
    }, ms)
  })
}

function AsyncComponentA({dataA}) {
  // 使用use来解析dataA这个promise对象
  const data = use(dataA)
  return (
    <div>AsyncComponentA: {data} </div>
  )
}
AsyncComponentA.propTypes = {
  dataA: PropTypes.object.isRequired,
}

function AsyncComponentB({dataB}) {
  const data = use(dataB)
  return (
    <div>AsyncComponentB: {data}</div>
  )
}

AsyncComponentB.propTypes = {
  dataB: PropTypes.object.isRequired,
}

export default function App() {
  // 发送请求
  const dataA = fetchDataByTime(3000)
  const dataB = fetchDataByTime(5000)
  console.log(dataA)//[object Promise]
  console.log(dataB)//[object Promise]
  return (
    <Suspense fallback={<p>loading....</p>}>
      <AsyncComponentA dataA={dataA}></AsyncComponentA>
      <AsyncComponentB dataB={dataB}></AsyncComponentB>
    </Suspense>
  )
}

/**
 * Suspense可以同时管理多个挂起的Promsie
 * 所有挂起的Promise必须都解析才能结束挂起状态
 */