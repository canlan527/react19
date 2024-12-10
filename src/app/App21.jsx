export default function App() {
  const formAction = (formData) => {
    console.log(formData)
    // const name = formData.get('name')
    // const email = formData.get('email')

    const all = formData.getAll()
    // console.log(name, email)
    console.log(all)
  }
  return (
    <div>
      <h1>Form Action</h1>
      <form action={formAction}>
        <p>
        <label htmlFor="name">姓名：</label>
        <input type="text" id="name" name="name"  />
        </p>
        <p>
          <label htmlFor="email">邮箱：</label>
          <input type="text" id="email" name="email" />
        </p>
        <p>
          <button type="submit">
            提交
          </button>
        </p>
      </form>
    </div>
  )
}
/**
 * FormAction 表单动作
 * 自动收集表单的值
 * 不需要给input框提供ref，获取DOM，获取Target，value了
 */