import { useRef, forwardRef, useImperativeHandle, useState } from "react";


function MyInput({ref}) {
  const inputRef = useRef(ref)
  // 使用 useImperativeHandle可以自定暴露给父组件的内容
  // 第一个参数是传递进来的ref，第二个是函数，此函数返回一个对象，在对象里自行发挥。
  useImperativeHandle(ref, () => ({
    // 这里自定义返回给父组件四个操作input的方法
    // 聚焦
    getFocus() {
      inputRef.current.focus()
    },
    // 获取值
    getValue() {
      return inputRef.current.value
    },
    // 设置值
    setValue(value) {
      inputRef.current.value = value
    },
    // 返回 DOM
    getDOM() {
      return inputRef.current
    }

  }))
  return <input type="text" ref={inputRef} />
}


export default function App() {
  const myInputRef = useRef(null)

  const handleClick = () => {
    myInputRef.current.getFocus();//给子组件设置焦点
    myInputRef.current.setValue('hello~') // 给子组件设置值
    console.log(myInputRef.current.getValue()) // 获取子组件input的内容
    console.log(myInputRef.current.getDOM()) // 获取input DOM
  }

  return (
    <>
      <h1>传递ref</h1>
      {/* myInputRef拿到的就是子组件里useImperativeHandle函数返回的对象 */}
      <MyInput ref={myInputRef} />
      <button onClick={handleClick}>点击设置值</button>
    </>
  )
}




// 获取子组件的DOM
// const MyInput = forwardRef((props, ref) => {
//   return (
//     <input type="text" ref={ref} />
//   )
// })
// // function InnerInput({ ref }) {
// //   const inputRef = useRef(ref)
// //   // console.log(inputRef.current)
// //   return <input type="text" ref={inputRef} />
// // }

// export default function App() {
//   const InputRef = useRef(null)

//   const handleClick = () => {
//     console.log(InputRef.current)
//   }

//   return (
//     <>
//       <h1>获取子组件的DOM</h1>
//       <MyInput ref={InputRef} />
//       <button onClick={handleClick}>点击</button>
//       {/* 可以直接获取到D OM */}
//       {/* <input type="text" ref={InputRef} /> */}
//     </>
//   )
// }

/**
 * 当你将 ref 传递给 JSX 中的 ref 属性时，比如 <div ref={myRef}>，React 会将相应的 DOM 元素放入 myRef.current 中。当元素从 DOM 中删除时，React 会将 myRef.current 更新为 null。
 * 
 */