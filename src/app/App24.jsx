import { useActionState } from 'react'

/* 表单提交案例：判断密码 */
function FormSubmit() {
  const [state, formAction, pending] = useActionState(async (currentState, formData) => {
    // 拿到表单数据
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    // 验证password
    if (!password || password.length < 6) {
      return {// 返回失败的state
        error: {
          message: '密码不能少于6位数！'
        },
        data: {},
      }
    }
    // 发送请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    // 返回成功的state
    return {
      error: null,
      data: {
        message: '提交成功',
        name,
        email,
      }
    }
  }, { // 初始state
    error: null,
    data: null
  })

  return (
    <form action={formAction}>
      <h1>处理表单提交</h1>
      {/* 表单 */}
      <p>
        <label htmlFor="name">昵称：</label>
        <input type="text" id="name" name="name" disabled={pending} />
      </p>
      <p>
        <label htmlFor="email">邮箱：</label>
        <input type="text" id="email" name="email" disabled={pending} />
      </p>
      <p>
        <label htmlFor="password">密码：</label>
        <input type="password" id="password" name="password" disabled={pending} />
      </p>
      <p>
        <button type="submit">提交</button>
      </p>
      {
        // 表单状态展示state
        state.error && <div style={{ color: 'red' }}>{state.error.message}</div>
      }
      {
        // 表单状态展示state
        state.data && <div style={{ color: 'green' }}>{state.data.message}</div>
      }
    </form>

  )
}


// 案例2：添加购物车
function BookItem({ title, bIndex }) {

  const [message, cartAction, isPending] = useActionState(async (prevState, queryData) => {
    if (bIndex === '1') {
      return '已加入购物车'
    } else {
      await new Promise(resolve => setTimeout(resolve, 1500))
      return '无法加入购物车'
    }
  }, null)
  return (
    <form action={cartAction} style={{ border: '1px solid #333', margin: '8px', padding: '8px' }}>
      <h3>书籍：《{title}》</h3>
      <button type="submit">加入购物车</button>
      <span style={{ margin: '0 12px' }}>
        {isPending ? '加载中...' : message}
      </span>
    </form>
  )
}

function AddToCart1() {
  return (
    <div>
      <h1>添加购物车-基础</h1>
      <BookItem bIndex="1" title="你不知道的JS" />
      <BookItem bIndex="2" title="考研英语7000词" />
    </div>
  )
}

function BookItem2({ title, bIndex }) {
  const [state, cartAction2, isPending] = useActionState((pevState, formData) => {
    if (bIndex === '1') {
      return {
        success: true,
        cartSize: 12,
      }
    } else {
      return {
        success: false,
        message: '商品已售罄'
      }
    }
  }, {
    success: null,
    message: ''
  })

  return (
    <form action={cartAction2} style={{ border: '1px solid #333', margin: '8px', padding: '8px' }}>
      <h3>书籍：《{title}》</h3>
      <button type="submit">加入购物车</button>
      <span style={{ margin: '0 12px' }}>
        {
          state.success && (isPending ? '加载中...' : `已成功加入购物车，还剩${state.cartSize}件`)
        }
        {
          state.success === false && (isPending ? '加载中...' : `加入购物车失败：${state.message}`)
        }
      </span>
    </form>
  )
}

function AddToCart2() {
  return (
    <div>
      <h1>添加购物车-进阶</h1>
      <BookItem2 bIndex="1" title="React设计原理" />
      <BookItem2 bIndex="2" title="题源报刊精品阅读" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <FormSubmit />
      <AddToCart1 />
      <AddToCart2 />
    </>
  )
}