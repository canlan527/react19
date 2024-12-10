import { useState } from "react"
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <p>
      <button type="submit" disabled={pending}>提交</button>
    </p>
  )
}

function Input({text}) {
  const { pending } = useFormStatus()
  return (
    <>
      <label htmlFor={text}>{text}: </label>
      <input type="text" id={text} name={text} disabled={pending} />
    </>
  )
}

export default function App() {
  const [message, setMessage] = useState('')

  const formAction = async (formData) => {
    // 拿到表单数据
    const email = formData.get('email')
    const username = formData.get('username')
    // 发送请求
    // 设置message
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage(`用户：${username}，邮箱：${email}`)
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <>
      <h1>表单提交</h1>
      <form action={formAction}>
        <p>
          <Input text="email" />
        </p>
        <p>
          <Input text="username" />
        </p>
        <SubmitButton />
        {message && <p>{message}</p>}
      </form>
    </>
  )
}

