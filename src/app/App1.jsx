import React, { useState, useEffect } from "react";
// const data = use(Promise.resolve('hello world'))
const getMessage = Promise.resolve('hello react19')
function App() {
  const data = use(getMessage)
  // const { data } = use(Promise.resolve('hello react9'))
  return <div>
    {data}
  </div>
}

// v3:实现use
// ✅原因：use在执行异步的操作，而react异步操作都要放在useEffect中并使用useState获取异步数据
// function use(promise) {
//   const [data, setData] = useState(null)
//   const [error, setError] = useState(null)
//   useEffect(() => {
//     if (promise instanceof Promise) {
//       promise.then((res) => {
//         setData(res)
//       }).catch((err) => setError(err))
//     }
//   }, [promise])

//   return { data, error }
// }

// v2:实现use
// ❌原因：不能在react同步渲染的时候执行异步操作，react不会等待一步挂起再执行完才渲染
// function use(promise) {
//   if(!(promise instanceof Promise)) {
//     return promise;
//   }
//   let status = 'pending'
//   let value;
//   let reason;
//   // 使用一个包装Promise的对象来追踪状态
//   const wrappedPromise = new Promise((resolve, reject) => {
//     // 将传入的promise包裹一层是为了控制status和执行结果
//     promise.then((res) => {
//       // 成功的处理
//       status = 'fulfilled'
//       value = res;
//       resolve(value);
//     }).catch((err) => {
//       // 失败的处理
//       status = 'rejected'
//       reason = err
//       reject(reason)
//     })
//   })

//   // 根据status不同状态返回不同的值
//   if(status === 'fulfilled') {
//     return value
//   } else if(status === 'rejected') {
//     return reason
//   }
//   // 如果以上已决的状态，是pending初始状态
//   return wrappedPromise;
// }


// v1:实现use
// ❌原因：promise的status和value都是内部的值，不能从外面获取，所以这么做不行
function use(promise) {
  // if(!(promise instanceof Promise)) {
  //   return promise;
  // }
  console.log('use')
  switch(promise.status) {
    case 'fulfilled':
      return promise.value;
    case 'rejected':
      return promise.reason;
    default:
      throw promise.then((value) => {
        promise.status = 'fulfilled'
        promise.value = value;
      },(reason) => {
        promise.status = 'rejected'
        promise.reason = reason
      })
  }
}
export default App

/**
 * use:在渲染中读取资源
 * 可以使用use读取一个promise，react将挂起，指导promise解析完成
 * use用于直接处理异步数据和操作
 */