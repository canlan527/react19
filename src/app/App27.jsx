import { useState, useOptimistic, useTransition } from "react"

function reducerTodo(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.todo]
    case 'delete':
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
}

export default function App() {
  // 定义todos的初始状态
  const [todos, setTodos] = useState([
    { id: crypto.randomUUID(), text: '学习react' },
    { id: crypto.randomUUID(), text: '学习useOptimistic' },
  ])

  // 乐观更新
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos, reducerTodo)
  // 过渡
  const [isPending, startTransition] = useTransition()
  const formAddAction = (formData) => {
    // 通过表单的action获取input框的值
    const text = formData.get('todo').trim()
    if (!text) return;
    // 构造乐观更新
    const optimisticId = crypto.randomUUID()
    const optimisticTodo = {
      id: optimisticId,
      text
    }
    startTransition(async () => {
      addOptimisticTodo({
        type: 'add',
        todo: optimisticTodo
      })
      // 模拟接口调用，设置延迟
      try {
        // 返回后端真实id
        const serverGenId = await new Promise(resolve => setTimeout(() => resolve(crypto.randomUUID()), 500))
        // 真实todo
        const acturlTodo = {
          id: serverGenId,
          text
        }
        console.log(acturlTodo)
        // 设置真实数据
        // setTodos([...todos, optimisticTodo])
        setTodos((prevState) => [...prevState, acturlTodo])
      } catch (e) {
        console.log(e)
      }
    })


  }

  const handleDel = (id) => {
    startTransition(async () => {
      // 乐观更新
      addOptimisticTodo('delete')
      // 模拟接口调用，设置延迟
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        setTodos(todos.filter(item => item.id !== id))
      } catch (e) {
        console.log(e)
      }
      // 设置真实数据
    })
  }

  return (
    <div>
      <h1>todos</h1>
      <form>
        <input type="text" name="todo" disabled={isPending} />
        <button formAction={formAddAction} disabled={isPending} >添加</button>
      </form>
      <ul>
        {
          optimisticTodos.map((item) => (
            <li key={item.id}>
              <span>{item.text}</span>
              <button disabled={isPending} onClick={() => handleDel(item.id)}>删除</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}