import { useState, useOptimistic, useTransition, useRef } from "react"

// 喜爱度组件
function LikeCount() {
  const [likeCount, setLikeCount] = useState(99)
  const [optimisticState, addOptimistic] = useOptimistic(likeCount, (state, action) => {
    switch (action.type) {
      case 'increase':
        return state + 1;
      case 'decrease':
        return state - 1;
      default:
        return state;
    }
  })
  const [isPending, startTransition] = useTransition()

  const increase = () => {
    startTransition(async () => {
      // 乐观更新,类似于dispatch
      addOptimistic({ type: 'increase' })
      // 请求接口,响应2秒
      await new Promise(resolve => setTimeout(resolve, 2000))
      // 设置likeCount
      setLikeCount(likeCount => likeCount + 1)
    })

  }

  const decrease = () => {
    startTransition(async () => {
      // dispatch乐观更新
      addOptimistic({ type: 'decrease' })
      // 请求延迟
      await new Promise(resolve => setTimeout(resolve, 2000))
      // 设置likeCount
      setLikeCount(likeCount => likeCount - 1)
    })
  }

  return (
    <>
      <h1>喜爱度：{optimisticState}</h1>
      <button onClick={decrease} disabled={isPending}>👎</button>
      <button onClick={increase} disabled={isPending}>👍</button>
      <div>{isPending ? '谢谢支持...' : ''}</div>
    </>
  )
}

// 消息发送
function SendMessage() {
  const [message, setMessage] = useState('')
  const inputRef = useRef()
  const [isPending, startTransition] = useTransition()
  const [optimisticMessage, addOptimisticMessage] = useOptimistic(message, (message, action) => {
    if (action.type === 'addMessage') {
      message = action.value
    } else if (action.type === 'clearMessage') {
      message = ''
    }
    return message;
  })

  const handleSend = () => {
    // 过渡更新，回退需要过渡更新函数
    startTransition(async () => {
      try {
        // 获取输入框的值
        const value = inputRef.current.value;
        // 乐观更新
        addOptimisticMessage({ type: 'addMessage', value })
        // 设置延迟
        await new Promise((resolve,reject) => setTimeout(resolve, 1200))
        // 设置message
        setMessage(value)
      } catch (e) {
        addOptimisticMessage({ type: 'clearMessage' })
        setMessage('')
      } finally {
        // 清空输入框
        inputRef.current.value = ''
      }
    })
  }

  return (
    <>
      <h1>发送消息</h1>
      <div>{isPending ? `sending${optimisticMessage}...` : <b>{optimisticMessage}</b>}</div>
      <input type="text" ref={inputRef} disabled={isPending} />
      <button onClick={handleSend} disabled={isPending}>发送</button>
    </>
  )
}

export default function App() {

  return (
    <>
      <LikeCount />
      <hr />
      <SendMessage />
    </>
  )
}