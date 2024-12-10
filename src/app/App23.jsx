import { useActionState } from 'react'


export default function App() {
  /* useActionState: 可以根据表单动作的结果更新 state
    params: 
      1. 函数：代表表单状态与
      2. 对象：代表state的初始状态
    
   
   */
  const [state, formAction, pending] = useActionState(async (currentState, formData) => {
    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')

    if (!password || password.length < 6) {
      return {
        error: {
          message: '密码不能小于6位！',
          data: currentState.data
        }
      }
    }
    // 发送请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    // 请求成功的返回 
    return {
      error: null,
      data: {
        message: '提交成功',
        username,
        email,
      }
    }
  }, { // 这是一个初始状态
    error: null,
    data: {}
  })

  return (
    <>
      <h1>处理表单提交</h1>
      <form action={formAction}>
        <p>
          <label htmlFor="username">昵 称：</label>
          <input type="text" id="username" name="username" disabled={pending} />
        </p>
        <p>
          <label htmlFor="email">邮 箱：</label>
          <input type="text" id="email" name="email" disabled={pending} />
        </p>
        <p>
          <label htmlFor="pasword">密 码：</label>
          <input type="pasword" id="pasword" name="pasword" disabled={pending} />
        </p>
        <p>
          <button type="submit" disabled={pending}>提交</button>
        </p>
      </form>
      {
        state.error && <div style={{ color: 'red' }}>{state.error.message}</div>
      }
      {
        state.data && <div style={{ color: 'green' }}>{state.data.message}</div>
      }
    </>
  )
}